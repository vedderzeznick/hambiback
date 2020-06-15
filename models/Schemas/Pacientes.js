const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Metodospago = new Schema ({
    tipo: {
        type: String,
        trim: true
    }
});

const Atenciones = new Schema ({
    _idDoctor: {
        type: String,
        trim: true
    },
    fecha: {
        type: Date,
        trim: true
    },
    tipo: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    }
});

const pacientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    cedula: {
        type: String,
        trim: true
    },
    fotoURL: {
        type: String,
        trim: true
    },
    telefono:{
        type: String,
        trim: true
    },
    nacimiento:{
        type: String,
        trim: true
    },
    metodospago: [Metodospago],
    atenciones: [Atenciones],
    latitud: {
        type: Number
    },
    longitud: {
        type: Number
    }
})

module.exports =  pacientesSchema