// Initiate connection to DB
var mongoose = require('mongoose');
//MONGODB CONNECTION

// production
var dbURL = require('./lib/api_config.js');
mongoose.connect(dbURL.dbURL);

// development
// mongoose.connect('mongodb://localhost/billfetchertest');

//import socket.io and http because socket.io rely on http to connect.
var socketIo = require('socket.io');
var http = require('http');

var app = require('./server-config.js');

//HTTP SERVER CONNECTION
var port = process.env.PORT || 8080;
//create server with http (because socket require connection with http not just app) then pass in app so all handlers will be part of http server.
var server = http.createServer(app);
//have socket.io pair with http server.
var io = socketIo(server);

//socket.oi connection configuration for the server end to handle incomming data with io.on and handle out going data by broadcasting with socket.broadcast.emit.
io.on('connection', function(socket) {
  console.log("SOCKET CONNECTED!!!!!")
  socket.on('message', function(messageObj) {
    console.log("message received from backend!!", messageObj)
    socket.broadcast.emit('message', messageObj)
    console.log("MESSAGE EMITTED")
  })
})

//have http server listen to port.
server.listen(port, function() {
  console.log('Server now listening on port ' + port);
});

//app.listen(port);

//console.log('Server now listening on port ' + port);