"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var Ssn_1 = require("./models/Ssn");
var app = express_1["default"]();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// ------------------------
// ROUTE
// ------------------------
app.get('/', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, '..', 'public', 'index.html'));
});
// ------------------------
// // -- Catch a connection
// ------------------------
io.on('connection', function (socket) {
    console.log('a user connected', socket);
    // -- Build a room
    var room = "room";
    socket.join(room);
    // -- catch disconnect
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    // -- Conversation stuff
    socket.on('message', function (message) {
        // --- Message treatment :
        if (message.step === 0) {
            var mySsn = new Ssn_1.Ssn(message.answer);
            io.to(room).emit('return', message.answer + " " + (mySsn.isValid() ? "est valide " : "est non valide"));
        }
        else {
            io.to(room).emit('init');
        }
    });
    // -- First message
    io.to(room).emit('welcome', room);
});
http.listen(3010, function () {
    console.info('HTTP server started on port 3010');
});
