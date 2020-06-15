//const express = require('express')
const { dbUser, dbNotification } = require('../controllers/db')
/* const { verifyAuth } = require('../middlewares/authenticated') */
const moment = require('moment')
const Canales = require('../models/Canal')
let _nsp

const createMessageResponse = (msg) => {
    var lista = []

    if (Array.isArray(msg)) {
        msg.map(m => {
            lista.push(
                {
                    id: m._id,
                    mensaje: m.mensaje // contenido del mensaje
                }
            )
        })
    } else {
        lista.push(
            {
                id: msg._id,
                mensaje: msg.mensaje // contenido del mensaje
            }
        )
    }
    return lista
}

function socketIO(server) {
    const io = require('socket.io').listen(server)
    const nsp = io.of('/hambiChannel')
    /* Handle user connection event */
    nsp.on('connection', (client, cb) => {
        dbUser.create(client.query.usuarioUUID, client)
        console.log('contenido del cliente : ', client.query)  
        client.on('onVideoCallRequest', (data) => {
            console.log('contenido del cliente : ', client)
            console.log('id del doctor : ', data)
            dbUser.findConnectionUserActive(data.userId).then(res => {
                if (res.length) {
                    console.log('la respuesta de la base de datos es: ', res)
                    nsp.to(`${res.sockerID}`).emit('onReceiveVideoCall', 'te estan llamando!')
                }
            }).catch(err => {
                console.log(err)
            })
            client.emit('onReceiveVideoCall', 'te estan llamando');
        });
        client.on('onAcceptVideoCallRequest', (data) => {
            
        });
    })
    _nsp = nsp
}

function sendIO(userId, canal, msg) {
    if (_nsp) {
        dbUser.findConnectionUserActive(userId, canal).then(res => {
            if (res.length) {
                res.map(sock => {
                    // sending to individual socketid (private message)
                    _nsp.to(`${sock.userID}`).emit('notificacion', createMessageResponse(msg))
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = {
    socketIO: socketIO,
    sendIO: sendIO
}
