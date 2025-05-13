const mongoose = require('mongoose');

const estadoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('estados', estadoSchema);