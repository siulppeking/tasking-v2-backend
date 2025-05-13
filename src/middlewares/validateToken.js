const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) return res.status(401).json({ message: 'Invalid token.' });
        req.token = token;
    })
    next()
}

module.exports = validateToken;