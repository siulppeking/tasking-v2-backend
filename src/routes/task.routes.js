const { Router } = require('express');
const taskController = require('../controllers/task.controller');
const validateToken = require('../middlewares/validateToken');
const validateSchema = require('../middlewares/validate.middleware');
const { createTaskSchema } = require('../schemas/task.schema');

const taskRouter = Router();

taskRouter.get('/', validateToken, taskController.getAll);

taskRouter.post('/', validateToken, validateSchema(createTaskSchema), taskController.create);

taskRouter.get('/:id', validateToken, taskController.getById);

taskRouter.put('/:id', validateToken, taskController.update);

taskRouter.delete('/:id', validateToken, taskController.delete);

taskRouter.get('/complete/:id', validateToken, taskController.complete);

module.exports = taskRouter;

