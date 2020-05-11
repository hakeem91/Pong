import express from 'express';
import path from 'path';
import socketIO from 'socket.io';

import { Ssn } from './models/Ssn';

const app: express.Application = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

// ------------------------
// ROUTE
// ------------------------
app.get('/',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
});

// ------------------------
// // -- Catch a connection
// ------------------------
io.on('connection', (socket:socketIO.Socket)=>{

    console.log('a user connected',socket);

    // -- Build a room
    let room:string = "room";
    socket.join(room);

    // -- catch disconnect
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });

    // -- Conversation stuff
    socket.on('message', (message : object)=>{
        // --- Message treatment :
        if(message.step === 0){
            let mySsn = new Ssn(message.answer);
            io.to(room).emit('return', message.answer + " " + (mySsn.isValid() ? "est valide " : "est non valide"));
        }else{
            io.to(room).emit('init');
        }
    });

    // -- First message
    io.to(room).emit('welcome',room);

});


http.listen(3010,()=>{
    console.info('HTTP server started on port 3010');
});









