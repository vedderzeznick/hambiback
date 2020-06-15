'use strict'

const express = require('express')
const { dbNotification } = require('../controllers/db')
/* const { ensureAuth, signAuth } = require('../middlewares/authenticated') */
const { sendIO } = require('./socketIO')
const moment = require('moment')

/* const winston = require('../logger'); */

var api = express.Router()

/* api.get('/auth', signAuth, (req, res) => {
  res.status(200).send('token generado' + req.token)
}) */

api.post('/createNotification'/* , ensureAuth */, (req, res) => {
  dbNotification.create(
    req.body.id,  // Id de doctor y paciente
    req.body.channel,
    req.body.idMensaje,
    req.body.mensaje,
    req.body.fechaCaducidad
  )
    .then((res, err) => {
      if (err) {
        console.log(err)
        /* winston.error('api - dbNotification.create error ->' + err); */
      }

      if (moment(res.fechaCaducidad, 'YYYY-MM-DD HH:mm:ss') > moment(new Date(), 'YYYY-MM-DD HH:mm:ss') || res.fechaCaducidad == null) {
        // entregarMensajeUsuario(res.idUsuario, res.canal, res)
        sendIO(res.idUsuario, res.canal, res)
        /* winston.info('api - dbNotification.create  - successful message creation '); */
      }
    })
    .catch(err => {
      console.log(err)
      /* winston.error('api - dbNotification.create error ->' + err); */
    })

  res.status(200).send('res.body llega')
})

module.exports = api
