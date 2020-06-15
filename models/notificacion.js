'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificacionSchema = new Schema({
  idPaciente: {
    type: String
  },
  idMedico: {
    type: String
  },
  fecha: {
    type: Date
  }
})

module.exports = mongoose.model('Notification', NotificacionSchema)
