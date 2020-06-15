const Usuarios = require('../models/Usuarios');
const Especialidades = require('../models/Catalogs/Especialidades')

exports.mostrarMedicos = async (req, res, next) => {
    let resMedicos = [];
    try {
        const medicos = await Usuarios.find({});
        medicos.map((obj, index) => {
            if (obj.userType == 1) {
                var especialidadS = "Medicina General";
                obj.userAccount.medico.especialidades.map((obj2, index2) => {
                    if (obj2.tipo == 'principal') {
                        especialidadS = obj2.descripcion
                    }
                })
                let totalc = 0;
                if (obj.userAccount.medico.comentarios.length > 0) {
                    obj.userAccount.medico.comentarios.map((obj3, index) => {
                        totalc = obj3.puntuacion + totalc;
                    })
                    totalc = totalc / obj.userAccount.medico.comentarios.length;
                }
                const sendingJSON = {
                    'usuarioUUID': obj._id,
                    'nombre': obj.userAccount.medico.nombre,
                    'apellido': obj.userAccount.medico.apellido,
                    'sexo': obj.userAccount.medico.sexo,
                    'acronimo': obj.userAccount.medico.sexo == 'masculino' ? 'Dr.' : 'Dra.',
                    'fotoURL': obj.userAccount.medico.fotoURL,
                    'puntuacion': (totalc).toFixed(1),
                    'estadoServicios': obj.userAccount.medico.estadoServicios,
                    'especialidad': especialidadS,
                    'pacientesLong': obj.userAccount.medico.pacientes.length,
                    'productos': obj.userAccount.medico.productos
                }
                resMedicos.push(sendingJSON)
            }
        })
        res.json(resMedicos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra medico por ID
exports.mostrarDetalleMedico = async (req, res, next) => {
    const { _id } = req.body;
    const medico = await Usuarios.findOne({ '_id': _id });
    if (!medico) {
        res.json({ mensaje: 'Ese medico no existe' });
        next()
    }
    var especialidadS = "Medicina General";
    medico.userAccount.medico.especialidades.map((obj2, index2) => {
        if (obj2.tipo == 'principal') {
            especialidadS = obj2.descripcion
        }
    })
    let totalc = 0;
    if (medico.userAccount.medico.comentarios.length > 0) {
        medico.userAccount.medico.comentarios.map((obj3, index) => {
            totalc = obj3.puntuacion + totalc;
        })
        totalc = totalc / medico.userAccount.medico.comentarios.length;
    }
    // Mostrar el paciente
    const responseJSON = {
        'usuarioUUID': medico._id,
        'nombre': medico.userAccount.medico.nombre,
        'apellido': medico.userAccount.medico.apellido,
        'cedula': medico.userAccount.medico.sexo,
        'ubicacion': 'Quito/Pichincha/Ecuador',
        'sexo': medico.userAccount.medico.sexo,
        'acronimo': medico.userAccount.medico.sexo == 'masculino' ? 'Dr.' : 'Dra.',
        'fotoURL': medico.userAccount.medico.fotoURL,
        'telefono': medico.userAccount.medico.telefono,
        'biografia': medico.userAccount.medico.biografia,
        'puntuacion': totalc.toFixed(1),
        'estadoServicios': medico.userAccount.medico.estadoServicios,
        'especialidades': medico.userAccount.medico.especialidades,
        'especialidadP': especialidadS,
        'idiomas': medico.userAccount.medico.idiomas,
        'pacientesLong': medico.userAccount.medico.pacientes.length,
        'productos': medico.userAccount.medico.productos,
        'comentarios': medico.userAccount.medico.comentarios,
        'comentariosLong': medico.userAccount.medico.comentarios.length,
        'latitud': medico.userAccount.medico.latitud,
        'longitud': medico.userAccount.medico.longitud
    }
    res.json(responseJSON);
}

exports.actualizarMedicos = async (req, res, next) => {
    try{
        const { fechaModif } = req.body;
        const nuevaFecha = new Date(fechaModif);
        const medicos = await Usuarios.find({'userType': 1})
        let resMedicos = [];
        medicos.map((obj, index) => {
            if (obj.fechaModif > nuevaFecha){
                resMedicos.push(obj)
            }
        })
        res.json(resMedicos);
    } catch(error){
        console.log(error);
        next();
    }
}

exports.mostrarEspecialidades = async (req, res, next) => {
    try {
        const especialidades = await Especialidades.find({});
        res.json(especialidades);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.nuevoComentario = async (req, res, next) => {
    console.log("el request llega de esta manera : ", req.body)
    try {
        let medico = await Usuarios.findOne({ '_id': req.body.idMedico });
        const paciente = await Usuarios.findOne({ '_id': req.body.idPaciente });
        const nuevoComentario = {
            nombre: paciente.userAccount.paciente.nombre + ' ' + paciente.userAccount.paciente.apellido,
            comentario: req.body.comentario,
            fecha: new Date(),
            fotoURL: paciente.userAccount.paciente.fotoURL
        }
        medico.userAccount.medico.comentarios.push(nuevoComentario)
        await Usuarios.findOneAndUpdate({ '_id': req.body.idMedico },
            medico, {
            new: true
        });
        res.json(nuevoComentario);
    } catch (error) {
        console.log(error);
        next();
    }
}