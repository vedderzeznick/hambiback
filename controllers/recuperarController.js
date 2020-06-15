const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nimbussoft.hambi@gmail.com',
      pass: 'Nimbus123'
    },
    tls: { rejectUnauthorized: false }
});


exports.verificarNumero = async (req, res, next) => {
    const medico = await Usuarios.findOne({ 'userAccount.medico.telefono': req.body.telefono });
    const paciente = await Usuarios.findOne({ 'userAccount.paciente.telefono': req.body.telefono });
    if (medico || paciente) {
        if (paciente) {
            res.json({ 'usuarioUUID': paciente._id, })
        } else {
            res.json({ 'usuarioUUID': medico._id, })
        }
    } else {
        res.json({ mensaje: 'El usuario no existe' })
    }
}

exports.nuevaContrasena = async (req, res, next) => {
    const usuario = await Usuarios.findOne({ '_id': req.body.usuarioUUID })
    if (usuario) {
        if (usuario.userProfile.password) {
            usuario.cuentaActiva = false;
            usuario.userProfile.password = await bcrypt.hash(req.body.password, 12);
            await Usuarios.findOneAndUpdate({ '_id': req.body.usuarioUUID },
                usuario, {
                new: false
            });
            const mailOptions = {
                from: 'nimbussoft.hambi@gmail.com',
                to: usuario.userProfile.correo,
                subject: 'Confirmación de nueva contraseña',
                text: 'https://hambiback.herokuapp.com/serviciosHambi/recuperarContrasena/confirmarContrasena/'+usuario._id
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log('error de nodemail', error);
                } else {
                  console.log('Email enviado: ' + info.response);
                }
              });
            res.json({ estado: true, mensaje: 'Contraseña actualizada' })
        }else{
            res.json({estado: false, mensaje: 'Contraseña inválida'})
        }
    } else {
        res.json({ estado: false, mensaje: 'El usuario no existe' });
    }
}

exports.confirmarContrasena = async (req, res, next) => {
    const usuario = await Usuarios.findById(req.params.idUsuario);
    if (!usuario) {
        res.json({ mensaje: 'Ese usuario no existe' });
        next()
    } else {
        usuario.cuentaActiva = true;
        await Usuarios.findOneAndUpdate({ '_id': req.params.idUsuario },
                usuario, {
                new: false
            });
        res.json({mensaje: 'Contraseña confirmada'});
    }
    // Mostrar el paciente
}