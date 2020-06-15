
'use strict'

const UserController = require('./user')
const NotificationController = require('./notification')

module.exports = {
  dbUser: new UserController(),
  dbNotification: new NotificationController()
}