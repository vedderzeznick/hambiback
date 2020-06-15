const express = require ('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000 ;
const { socketIO } = require('./routes/socketIO')
var api_routes = require('./routes/api');
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Mauricio:12341234@cluster0-pvg5z.gcp.mongodb.net/hambiback?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// crear el servidor
const app = express();
/* const server = require ('http').Server(app); */


// habilitar bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.get('/', (req, res) => res.send('main page'))

//Rutas de la app
app.use('/', routes());
app.use('/api', api_routes);

// puerto
app.set('port', process.env.PORT || 5000)
const server = app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
});

socketIO(server)

var messages = [{
    id: 1,
    text: "Conectado al socket...",
}]

// defeinir dominios para recibir peticiones
const whitelist = ['http://localhost:5000'];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        }else {
            callback(new Error ('No permitido por CORS'))
        }
    }
};
/* app.use(cors()); */

// websockets

/* io.on('connection', function(socket){
    console.log("el nodo con IP: " + socket.handshake.address + " se ha conectado...")
    socket.emit('messages', messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
}) */

/* const io = SocketIO.listen(server)
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('videocall:message', (data) => {
        io.sockets.emit('videocall:message', data)
    })
}) */