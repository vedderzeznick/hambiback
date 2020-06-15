const mongoose = require('mongoose');
const Pacientes = require('./Schemas/Pacientes');
const Medicos = require('./Schemas/Medicos');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    userType: {
        type: Number,
        required: true
    },
    userProfile:{
        correo: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    userAccount:{
        medico:  Medicos ,
        paciente:  Pacientes
    },
    fechaModif: {
        type: Date
    },
    fechaCreacion: {
        type: Date
    },
    cuentaActiva:{
        type: Boolean
    }
})

module.exports = mongoose.model('Usuarios', usuariosSchema);