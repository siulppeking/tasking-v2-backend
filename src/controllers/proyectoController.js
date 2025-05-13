const Proyecto = require('../models/proyecto');
const fechaHelper = require('../utils/fechaHelper');

const proyectoController = {
    obtenerTodo: async (req, res) => {
        try {
            //const user = req.token.id;
            const proyectos = await Proyecto.find({
                archivado: false
            }).sort({
                titulo: 'asc'
            });

            const data = proyectos.map(proyecto => {
                return {
                    proyectoId: proyecto.id,
                    titulo: proyecto.titulo,
                    descripcion: proyecto.descripcion,
                    estado: proyecto.estado,
                    fechaRelativa: fechaHelper.formatear(proyecto.createdAt, 'relativo')
                }
            });

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                estado: 'error',
                respuesta: 'Hubo un error al procesar la peticion.',
                exception: error.message
            });
        }

    },
    insertar: async (req, res) => {

        try {
            const { titulo, descripcion } = req.body;

            const proyectoNuevo = new Proyecto({ titulo, descripcion });

            const proyectoCreado = await proyectoNuevo.save();
            if (!proyectoCreado) return res.status(400).json({ message: "Proyecto no guardado." });

            const data = {
                proyectoId: proyectoCreado.id,
                titulo: proyectoCreado.titulo,
                descripcion: proyectoCreado.descripcion,
                estado: proyectoCreado.estado,
                fechaRelativa: fechaHelper.formatear(proyectoCreado.createdAt, 'relativo')
            }

            return res.status(201).json(data);
        } catch (error) {
            return res.status(500).json({
                estado: 'error',
                respuesta: 'Hubo un error al procesar la peticion.',
                exception: error.message
            });

        }
    },
    obtenerPorId: async (req, res) => {

        try {
            const { id } = req.params;
            const proyecto = await Proyecto.findById({ _id: id, archivado: false });

            if (!proyecto) return res.status(400).json({ message: "Proyecto no encontrado." });

            return res.status(200).json({
                proyectoId: proyecto.id,
                titulo: proyecto.titulo,
                descripcion: proyecto.descripcion,
                estado: proyecto.estado,
            });
        } catch (error) {
            return res.status(500).json({
                estado: 'error',
                respuesta: 'Hubo un error al procesar la peticion.',
                exception: error.message
            });
        }
    },
    actualizar: async (req, res) => {

        try {
            const { id } = req.params;
            const { titulo, descripcion, estado } = req.body;

            const proyectoModificado = await Proyecto.findByIdAndUpdate({ _id: id, archivado: false },
                { titulo, descripcion, estado },
                { new: true }
            );

            if (!proyectoModificado) return res.status(400).json({ message: "Proyecto no encontrado." });

            return res.status(200).json({
                proyectoId: proyectoModificado.id,
                titulo: proyectoModificado.titulo,
                descripcion: proyectoModificado.descripcion,
                estado: proyectoModificado.estado,
            });
        } catch (error) {
            return res.status(500).json({
                estado: 'error',
                respuesta: 'Hubo un error al procesar la peticion.',
                exception: error.message
            });
        }
    },
    archivar: async (req, res) => {
        try {
            const { id } = req.params;

            const proyectoModificado = await Proyecto.findByIdAndUpdate({ _id: id, archivado: false },
                { archivado: true },
                { new: true }
            );

            if (!proyectoModificado) return res.status(400).json({ message: "Proyecto no encontrado." });

            return res.status(200).json({
                proyectoId: proyectoModificado.id,
                titulo: proyectoModificado.titulo,
                descripcion: proyectoModificado.descripcion,
                estado: proyectoModificado.estado,
                archivado: proyectoModificado.archivado
            });
        } catch (error) {
            return res.status(500).json({
                estado: 'error',
                respuesta: 'Hubo un error al procesar la peticion.',
                exception: error.message
            });
        }
    },
    desarchivar: async (req, res) => {
        try {
            const { id } = req.params;

            const proyectoModificado = await Proyecto.findByIdAndUpdate({ _id: id, archivado: true },
                { archivado: false },
                { new: true }
            );

            if (!proyectoModificado) return res.status(400).json({ message: "Proyecto no encontrado." });

            return res.status(200).json({
                proyectoId: proyectoModificado.id,
                titulo: proyectoModificado.titulo,
                descripcion: proyectoModificado.descripcion,
                estado: proyectoModificado.estado,
                archivado: proyectoModificado.archivado
            });
        } catch (error) {
            return res.status(500).json({
                estado: 'error',
                respuesta: 'Hubo un error al procesar la peticion.',
                exception: error.message
            });
        }
    },
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;

            const proyectoEliminado = await Proyecto.findByIdAndDelete({ _id: id, archivado: true });

            if (!proyectoEliminado) return res.status(400).json({ message: "Proyecto no encontrado." });

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({
                estado: 'error',
                respuesta: 'Hubo un error al procesar la peticion.',
                exception: error.message
            });
        }
    },
}

module.exports = proyectoController;