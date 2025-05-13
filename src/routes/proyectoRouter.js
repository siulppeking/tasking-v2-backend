const { Router } = require('express');
const proyectoController = require('../controllers/proyectoController');

const proyectoRouter = Router();

proyectoRouter.get('/', proyectoController.obtenerTodo);

proyectoRouter.post('/', proyectoController.insertar);

proyectoRouter.get('/:id', proyectoController.obtenerPorId);

proyectoRouter.put('/:id', proyectoController.actualizar);

proyectoRouter.put('/archivar/:id', proyectoController.archivar);

proyectoRouter.put('/desarchivar/:id', proyectoController.desarchivar);

proyectoRouter.delete('/:id', proyectoController.eliminar);

module.exports = proyectoRouter;

