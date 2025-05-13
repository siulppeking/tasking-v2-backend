const { Router } = require('express');
const estadoController = require('../controllers/estadoController');

const estadoRouter = Router();

estadoRouter.get('/', estadoController.obtenerTodo);

estadoRouter.post('/', estadoController.insertar);

estadoRouter.get('/:id', estadoController.obtenerPorId);

estadoRouter.put('/:id', estadoController.actualizar);

module.exports = estadoRouter;

