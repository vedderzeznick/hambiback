const mongoose = require('mongoose');
/* const Pacientes = require('./Pacientes') */
const Schema = mongoose.Schema;

const Especialidades = new Schema ({
    campo: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Especialidades', Especialidades);