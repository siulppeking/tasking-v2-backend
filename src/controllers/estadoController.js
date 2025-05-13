const Estado = require('../models/estado');

const estadoController = {
    obtenerTodo: async (req, res) => {
        //const user = req.token.id;
        const estados = await Estado.find()
            .sort({
                codigo: 'asc'
            });

        const data = estados.map(estado => {
            return {
                estadoId: estado.id,
                codigo: estado.codigo,
                nombre: estado.nombre
            }
        });

        return res.status(200).json(data);
    },
    insertar: async (req, res) => {

        const { codigo, nombre } = req.body;

        const estadoNuevo = new Estado({ codigo, nombre });

        const estadoCreado = await estadoNuevo.save();
        if (!estadoCreado) return res.status(400).json({ message: "Estado no guardado." });

        const data = {
            estadoId: estadoCreado.id,
            codigo: estadoCreado.codigo,
            nombre: estadoCreado.nombre
        }

        return res.status(201).json(data);
    },
    obtenerPorId: async (req, res) => {
        const { id } = req.params;
        const estado = await Estado.findById({ _id: id });
        if (!estado) return res.status(400).json({ message: "Estado no encontrado." });

        return res.status(200).json({
            estadoId: estado.id,
            codigo: estado.codigo,
            nombre: estado.nombre
        });
    },
    actualizar: async (req, res) => {
        const { id } = req.params;
        const { codigo, nombre } = req.body;

        const estadoModificado = await Estado.findByIdAndUpdate({ _id: id }, { codigo, nombre }, {
            new: true
        });

        if (!estadoModificado) return res.status(400).json({ message: "Estado no encontrado." });

        return res.status(200).json({
            estadoId: estadoModificado._id,
            codigo: estadoModificado.codigo,
            nombre: estadoModificado.nombre
        });
    }
}

module.exports = estadoController;