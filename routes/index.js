const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');
const pacienteController = require('../controllers/pacienteController');
const medicosController = require('../controllers/medicosController');
const socketController = require('../controllers/socketController');
const recuperarController = require('../controllers/recuperarController');

// proteger rutas
const auth = require('../middleware/auth');   //habilitar autorizacion al terminar!!!

module.exports = function(){
    
    //Agrega nuevos pacientes via POST
    /* router.post('/pacientes', pacienteController.nuevoPaciente)

    //obtener todos los clientes via GET
    router.get('/pacientes', pacienteController.mostrarPacientes)

    //Muestra un cliente en específico (ID)
    router.get('/pacientes/:idPaciente', pacienteController.mostrarPaciente)

    //Eliminar paciente
    router.delete('/pacientes/:idPaciente', pacienteController.eliminarPaciente) */
    
    // Obtener catalogos especialidades
    router.get( '/serviciosHambi/especialidades/todas', medicosController.mostrarEspecialidades )

    // Obtener medicos
    router.get('/serviciosHambi/medicos/todos', medicosController.mostrarMedicos);

    // Obtener medico por ID
    router.post('/serviciosHambi/medicos/detalleMedico', medicosController.mostrarDetalleMedico);

    //nuevo comentario a medico
    router.post('/serviciosHambi/medicos/nuevoComentario', medicosController.nuevoComentario);

    //actualizar lista medicos
    router.post('/serviciosHambi/medicos/actualizar', medicosController.actualizarMedicos)

    // Actualizar paciente
    router.post('/serviciosHambi/pacientes/actualizar', pacienteController.actualizarPaciente)

    //registro
    router.post('/serviciosHambi/autorizacion/crearCuenta', usuariosController.registrarUsuario);
    //log
    router.post('/serviciosHambi/autorizacion/iniciarSesion', usuariosController.autenticarUsuario);
    // eliminar usuario
    router.delete('/serviciosHambi/usuarios/:idUsuario', usuariosController.eliminarUsuario);

    //comunicaciones socket
    router.post('/serviciosHambi/solicitarMedico', socketController.solicitarMedico);
    router.post('/serviciosHambi/aceptarSolicitud', socketController.aceptarSolicitud);

    //recuperar contraseña
    router.post('/serviciosHambi/recuperarContrasena/verificarNumero', recuperarController.verificarNumero)
    router.post('/serviciosHambi/recuperarContrasena/nuevaContrasena', recuperarController.nuevaContrasena)
    router.get('/serviciosHambi/recuperarContrasena/confirmarContrasena/:idUsuario', recuperarController.confirmarContrasena)

    return router;
}