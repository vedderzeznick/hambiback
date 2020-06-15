'use strict'

const Canal = require('../models/Canal')

class UserController {
    constructor() {

    }

    create(userID, channel) {

        console.log("userID " + userID)
        console.log("chanel " + channel)

        var me = {
            userID: userID,
            canal: channel
        }

        var user = new Canal(me)
        
        return user.save()
    }

    findConnectionUserActive(userID, channel) {
        return User.find({ userID: userID, canal: channel })
    }

    deleteConnectionOfUser(clientID) {
        return User.deleteOne({ socketId: clientID })
    }

    deleteAllUser() {
        return User.deleteMany({}, function (err, removed) { });
    }

}

module.exports = UserController
