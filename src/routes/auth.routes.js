const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const validateSchema = require('../middlewares/validate.middleware');
const { loginSchema, registerSchema } = require('../schemas/auth.schema');

const authRouter = Router();

authRouter.post('/login', validateSchema(loginSchema), authController.login);

authRouter.post('/register', validateSchema(registerSchema), authController.register);

authRouter.get('/verify', authController.verifyToken);

module.exports = authRouter;