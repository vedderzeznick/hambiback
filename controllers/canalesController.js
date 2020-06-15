const Canales = require('../models/Canal')

exports.create = async (userID, chanel) => {
    console.log("userID " + userID)
    console.log("chanel " + chanel)

    var me = {
        userID: userID,
        canal: chanel
    }

    const newChannel = new Canales(me)
    
    /* const dataToValidate = {
        socketId: "1",
        idUsuario: 213456,
        //      fecha: null,
        canal: 'imperial2'
    }

    var user = new Canales(me)
    console.log("user " + user)
    console.log("dataToValidate " + JSON.stringify(user))

    var model = new Canales()
    var result = user.joiValidate(me)
    if (result.error === undefined) {

        model.idUsuario = userID
        model.socketId = socketID
        model.canal = chanel


    } else {
        console.log("se genera error")
        console.log("result.error " + result.error)
        //throw result;
    } */
    return await newChannel.save()
}

exports.findConnectionUserActive = async (userID, channel) => {
    return await Canales.find({ idUsuario: userID, canal: channel })
}

exports.deleteConnectionOfUser = async (clientID) => {
    return await Canales.deleteOne({ socketId: clientID })
}

exports.deleteAllUser = async () => {
    return await Canales.deleteMany({}, function (err, removed) { });
}