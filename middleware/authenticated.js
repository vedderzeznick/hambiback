'use strict'

const jwt = require('jsonwebtoken')
/* const winston = require('../logger'); */

const {
  KEY_SECRET_API,
  KEY_SECRET_USER,
  KEY_SECRET_PASS
} = process.env

function verifyAuth(token, f) {
  if (token) {
    jwt.verify(token, KEY_SECRET_API, (err, decoded) => {
      if (err) {
        console.log(err)
        return
      }
      f(decoded.UserID)
    })
  }
}

/* function ensureAuth(req, res, next) {
  //console.log('JSON.stringify(req.headers) ' + JSON.stringify(req.headers))
  //console.log('req.headers ' + JSON.stringify(req.headers))

  let token = req.headers.authorization
  token = token.replace('Bearer ', '')
  // console.log("token sin Bearer " + token)
  if (token) {
    jwt.verify(token, KEY_SECRET_API, (err, decoded) => {
      // console.log(err)
      if (err) {
        winston.error('authenticated - ensureAuth -> ' + err);
        return res.json({ mensaje: 'Token inválida' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.send({
      mensaje: 'Token no proveída.'
    })
  }
}


function signAuth(req, res, next) {

  //validar token que envia el cliente...
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  if (!(username === KEY_SECRET_USER && password === KEY_SECRET_PASS)) {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }

  let token = jwt.sign({ UserID: "1" },
    KEY_SECRET_API,
    {
      expiresIn: '24h' // expires in 24 hours
    }
  );

  req.token = token
  next()
}
 */


module.exports = {
  verifyAuth,
  /* ensureAuth,
  signAuth */
}
