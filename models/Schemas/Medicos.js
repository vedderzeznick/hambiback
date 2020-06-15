const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema productos
const Productos = new Schema ({
    tipo: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    }
});

const Pacientes = new Schema ({
    _idPacientes: {
        type: String,
        trim: true
    }
});

const Atenciones = new Schema ({
    _idPaciente: {
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

const Especialidades = new Schema ({
    tipo: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
});

const Idiomas = new Schema({
    descripcion: {
        type: String,
        trim: true
    }
})

const Comentarios = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    comentario: {
        type: String,
        trim: true
    },
    fecha: {
        type: Date
    },
    fotoURL: {
        type: String,
        trim: true
    },
    puntuacion:{
        type: Number,
        trim: true
    }
})

//schema medicos
const medicosSchema = new Schema ({
    nombre: {
        type: String,
        trim:true
    },
    apellido: {
        type: String,
        trim: true
    },
    cedula: {
        type: String,
        trim: true
    },
    sexo: {
        type: String,
        trim: true
    },
    idiomas: [Idiomas],
    fotoURL: {
        type: String,
        trim: true
    },
    telefono: {
        type: String
    },
    nacionalidad: {
        type: String,
        trim: true
    },
    especialidades: [Especialidades],
    biografia: {
        type: String,
        trim: true
    },
    pacientes: [Pacientes],
    productos: [Productos],
    atenciones: [Atenciones],
    estadoServicios: {
        videollamada: {
            type: Boolean
        },
        consultorio: {
            type: Boolean
        },
        visita: {
            type: Boolean
        }
    },
    comentarios: [Comentarios],
    latitud: {
        type: Number
    },
    longitud: {
        type: Number
    }
});

module.exports =  medicosSchema;