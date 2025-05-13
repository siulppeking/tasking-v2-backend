const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const createAccessToken = require('../libs/jwt');
const jwt = require('jsonwebtoken');

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const userFoundEmail = await User.findOne({ email });
            if (!userFoundEmail) return res.status(400).json(['User not found']);

            if (!userFoundEmail.active) return res.status(400).json(['User is not active']);

            const isMatch = await bcrypt.compare(password, userFoundEmail.password);

            if (!isMatch) return res.status(400).json(['Invalid password']);

            const token = await createAccessToken({ id: userFoundEmail._id });

            return res.status(200).json({
                username: userFoundEmail.username,
                email: userFoundEmail.email,
                token
            });
        } catch (err) {
            console.log(err)
        }
    },
    register: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const userFoundEmail = await User.findOne({ email });
            if (userFoundEmail) return res.status(400).json(
                ['User already exists']
            );
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: passwordHash
            });

            const userSaved = await newUser.save();
            if (!userSaved) return res.status(400).json({ message: 'User already exists' })

            const token = await createAccessToken({ id: userSaved._id });

            return res.status(200).json({
                username: userSaved.username,
                email: userSaved.email,
                token
            });
        } catch (err) {
            console.log(err)
        }
    },
    verifyToken: async (req, res) => {
        const token = req.header('authorization');
        if (!token) return res.status(401).json({ message: 'Invalid token' });

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, token) => {
            if (err) return res.status(401).json({ message: 'Invalid token' });
            const userFound = await User.findById(token.id);
            if (!userFound) return res.status(401).json({ message: 'Invalid token' });

            return res.status(200).json({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email
            })
        })
    }
}

module.exports = authController;