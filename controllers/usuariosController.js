const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { dbUser } = require('../controllers/db')

exports.registrarUsuario = async (req, res) => {
    // leer los datos del usuario y colocarlos en usuarios
    let objModel;
    let sendingJSON;
    if (req.body.userType == 1) {
        let fotoURL = "https://firebasestorage.googleapis.com/v0/b/hambidata-f62ae.appspot.com/o/patientAvatar.png?alt=media&token=0c086f51-450d-4897-9c24-fcbe4203bdf0";
        objModel = {
            "userType": req.body.userType,
            "userProfile": {
                "correo": req.body.correo,
                "password": await bcrypt.hash(req.body.password, 12)
            },
            "userAccount": {
                "medico": {
                    "nombre": req.body.nombre,
                    "apellido": req.body.apellido,
                    "cedula": req.body.cedula,
                    "sexo": req.body.sexo,
                    "idiomas": [],
                    "fotoURL": fotoURL,
                    "telefono": req.body.telefono,
                    "nacionalidad": req.body.nacionalidad,
                    "especialidades": [],
                    "biografia": req.body.biografia,
                    "nacimiento": req.body.nacimiento,
                    "metodospago": [],
                    "atenciones": [],
                    "latitud": req.body.latitud,
                    "longitud": req.body.longitud
                }
            },
            "fechaModif": "",
            "fechaCreacion": "",
            "cuentaActiva": true
        }
    } else {
        let fotoURL = "https://firebasestorage.googleapis.com/v0/b/hambidata-f62ae.appspot.com/o/patientAvatar.png?alt=media&token=0c086f51-450d-4897-9c24-fcbe4203bdf0";
        if (req.body.fotoURL) {
            fotoURL = req.body.fotoURL
        }
        objModel = {
            "userType": req.body.userType,
            "userProfile": {
                "correo": req.body.correo,
                "password": await bcrypt.hash(req.body.password, 12)
            },
            "userAccount": {
                "paciente": {
                    "nombre": req.body.nombre,
                    "apellido": req.body.apellido,
                    "cedula": req.body.cedula,
                    "fotoURL": fotoURL,
                    "telefono": req.body.telefono,
                    "nacimiento": req.body.nacimiento,
                    "metodospago": [],
                    "atenciones": [],
                    "latitud": req.body.latitud,
                    "longitud": req.body.longitud
                }
            },
            "fechaModif": "",
            "fechaCreacion": "",
            "cuentaActiva": true
        }
    }

    const usuario = new Usuarios(objModel);
    console.log("objeto a guardar : ", usuario);
    if (usuario.userType == 0) {
        sendingJSON = {
            'estado': true,
            'data': {
                'usuarioUUID': usuario._id,
                'correo': usuario.userProfile.correo,
                'nombre': usuario.userAccount.paciente.nombre,
                'apellido': usuario.userAccount.paciente.apellido,
                'cedula': usuario.userAccount.paciente.cedula,
                'telefono': usuario.userAccount.paciente.telefono,
                'fotoURL': usuario.userAccount.paciente.fotoURL,
                'atenciones': usuario.userAccount.paciente.atenciones,
                'latitud': usuario.userAccount.paciente.latitud,
                'longitud': usuario.userAccount.paciente.longitud
            }
        }
    } else {

    }

    usuario.userProfile.password = await bcrypt.hash(usuario.userProfile.password, 12);
    usuario.fechaModif = new Date();
    usuario.fechaCreacion = new Date();
    try {
        await usuario.save();
        res.json(sendingJSON);
    } catch (error) {
        console.log(error);
        res.json({ estado: false, mensaje: error });
    }
}

exports.autenticarUsuario = async (req, res, next) => {
    // buscar el usuario
    const { correo, password } = req.body;
    const usuario = await Usuarios.findOne({ 'userProfile.correo': correo });
    if (!usuario) {
        // Si el usuario no existe
        await res.status(401).json({ estado: false, mensaje: "Usuario no existe" });
        next();
    } else {
        // El usuario existe, verificar password
        if (!bcrypt.compareSync(password, usuario.userProfile.password)) {
            // si el password es incorrecto
            await res.status(401).json({ estado: false, mensaje: 'Password incorrecto' });
            next();
        } else {
            /* dbUser.create(usuario._id, usuario.userProfile.correo) */
            // password correcto, crear token
            if (usuario.cuentaActiva == false) {
                res.json({ mensaje: 'Cuenta no activa' })
            } else {
                var token;
                if (usuario.userType == 0) {
                    token = jwt.sign({
                        correo: usuario.userProfile.correo,
                        nombre: usuario.userAccount.paciente.nombre,
                        id: usuario._id
                    },
                        'LLAVESECRETA',
                        {
                            expiresIn: '1h'
                        });
                    let atenciones = [];
                    /* console.log('atenciones paciente : ', usuario.userAccount.paciente.atenciones); */
                    usuario.userAccount.paciente.atenciones.map((obj, index) => {
                        const fotoURL = encontrarMedico(obj);
                        var atPush = obj
                        atPush = atPush.toJSON()
                        if(atPush.tipo == 'videollamada'){
                            atPush.fondoAtencion = 'URLvideollamada';
                            atPush.fotoDoctor = ''
                        }else if(atPush.tipo == 'visita'){
                            atPush.fondoAtencion = 'URLvisita';
                        }else {
                            atPush.fondoAtencion = 'URLconsultorio';
                        }
                        console.log(atPush)
                        atenciones.push(atPush)
                    })
                    try{
                        /* await Usuarios.findOne({'_id': obj._idDoctor}) */
                        const sendingJSON = {
                            'estado': true,
                            'token': token,
                            'data': {
                                'usuarioUUID': usuario._id,
                                'correo': usuario.userProfile.correo,
                                'nombre': usuario.userAccount.paciente.nombre,
                                'apellido': usuario.userAccount.paciente.apellido,
                                'cedula': usuario.userAccount.paciente.cedula,
                                'telefono': usuario.userAccount.paciente.telefono,
                                'fotoURL': usuario.userAccount.paciente.fotoURL,
                                'atenciones': atenciones,
                                'fechaModif': usuario.fechaModif,
                                'fechaCreacion': usuario.fechaCreacion,
                                'latitud': usuario.userAccount.paciente.latitud,
                                'longitud': usuario.userAccount.paciente.longitud
                            }
                        }
                        res.json(sendingJSON)
                    } catch(error){
                        res.json({mensaje: error})
                    }
                    
                } else {
                    token = jwt.sign({
                        correo: usuario.userProfile.correo,
                        nombre: usuario.userAccount.medico.nombre,
                        id: usuario._id
                    },
                        'LLAVESECRETA',
                        {
                            expiresIn: '1h'
                        });
                    let especialidadS;
                    usuario.userAccount.medico.especialidades.map((obj, index) => {
                        if (obj.tipo == 'principal') {
                            especialidadS = obj.descripcion
                        } else {
                            especialidadS = 'General'
                        }
                    })
                    let idAtenciones = []
                    usuario.userAccount.medico.atenciones.map((obj, index) => {
                        idAtenciones.push(obj._id)
                    })
                    let promPuntuacion = 0, cont1=0;
                    usuario.userAccount.medico.comentarios.map((obj, index) => {
                        promPuntuacion = promPuntuacion + obj.puntuacion;
                        cont1++;
                    })
                    promPuntuacion = (promPuntuacion/cont1).toFixed(2);

                    const sendingJSON = {
                        'estado': true,
                        'token': token,
                        'data': {
                            'usuarioUUID': usuario._id,
                            'correo': usuario.userProfile.correo,
                            'nombre': usuario.userAccount.medico.nombre,
                            'apellido': usuario.userAccount.medico.apellido,
                            'cedula': usuario.userAccount.medico.cedula,
                            'telefono': usuario.userAccount.medico.telefono,
                            'fotoURL': usuario.userAccount.medico.fotoURL,
                            'especialidad': especialidadS,
                            'atenciones': usuario.userAccount.medico.atenciones,
                            'puntuacion': usuario.userAccount.medico.puntuacion,
                            'historialUUID': idAtenciones,
                            'puntuacion': promPuntuacion,
                            'estadoPuntuacion' : usuario.userAccount.medico.comentarios.length > 0 ? true : false,
                            'latitud': usuario.userAccount.medico.latitud,
                            'longitud': usuario.userAccount.medico.longitud
                        }
                    }
                    res.json(sendingJSON)
                }
            }

        }
    }
}

async function encontrarMedico(obj){
    try{
        await Usuarios.findOne({'_id': obj._idDoctor})
        console.log('la foto es : ', medico.userAccount.medico.fotoURL)
        return medico.userAccount.medico.fotoURL
    } catch(error){
        return error
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        await Usuarios.findOneAndDelete({ _id: req.params.idUsuario });
        res.json({ mensaje: 'El usuario se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}