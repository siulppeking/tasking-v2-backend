const { z } = require('zod');

const createTaskSchema = z.object({
    title: z.string({
        required_error: 'title is required'
    }),
    description: z.string({
        required_error: 'description is required'
    })
});

module.exports = {
    createTaskSchema
}