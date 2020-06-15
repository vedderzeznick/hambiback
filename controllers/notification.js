'use strict'

const Notification = require('../models/notificacion')

class NotificationController {
  constructor () {

  }

  create (paciente, medico, fecha) {
    var model = new Notification()
    model.idPaciente = paciente
    model.idMedico = medico
    model.fecha = fecha

    return model.save()
  }

  findNotificationsByUser (userID, channel) {
    return Notification.find({ idUsuario: userID, canal: channel, estado: 1 })
  }

  updateMessagesOfUser (id) {
    return Notification.findOneAndUpdate({ _id: id }, { estado: 2 })
  }
}

module.exports = NotificationController
