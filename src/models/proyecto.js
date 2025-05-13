const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        default: null,
        trim: true
    },
    estado: {
        type: String,
        default: '01'
    },
    archivado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('proyectos', proyectoSchema);