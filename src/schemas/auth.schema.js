const { z } = require('zod');

const registerSchema = z.object({
    username: z.string({
        required_error: 'Username must be provided'
    }),
    email: z.string({
        required_error: 'Email must be provided'
    }).email({
        required_error: 'Email must be valid'
    }),
    password: z.string({
        required_error: 'Password must be provided'
    }).min(6, {
        message: 'Password must be at least 6 characters long'
    })
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email must be provided'
    }).email({
        required_error: 'Email must be valid'
    }),
    password: z.string({
        required_error: 'Password must be provided'
    }).min(6, {
        message: 'Password must be at least 6 characters long'
    })
});

module.exports = {
    registerSchema,
    loginSchema
};
