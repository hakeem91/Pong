"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("path"));
var express = require('express');

//const ioController = require('../public/js/ioController.js');
//const Ssn_1 = require("./models/Ssn");
const app = express_1.default();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 let departement ="coucou";
// ------------------------
// ROUTE
// ------------------------
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'pong.html'));
});

app.use("/js", express.static('../public/js/'));
app.use("/css", express.static('../public/css/'));

app.use("/sound", express.static('../public/sound/'));

// ------------------------
// // -- Catch a connection
// ------------------------
var nombre=0;
var playerOne = 0;
var playerTwo = 0;
var users = [];


io.on('connection', socket => { 
   
    //console.log("le user est : "+ users[0]);
users.push(socket.id);
    let room = "room";
    socket.join(room);
    users.push(socket.id);
     //socket.on('Hakeem', Hakeem => console.log(`welcome ${Hakeem.name}`) );  // "écoute" côté serveur des messages 'player' émis par cocket

    //ioController.registerSocket(socket,nombre);
    
    //playerOne=socket.id;
   // console.log("Le player one est"+playerOne); 
     //socket.on('Soso', Soso => console.log(`Actuellement ${socket.id}`) );  // "écoute" côté serveur des messages 'player' émis par cocket
              socket.emit('users',users );
              var posXS= 1;
              var posYS=1;
              var posJ1=1;
               var posJ2=1;
var scoreJ1=0;
               var scoreJ2=0;
  socket.on('positionBall', positionBall => {
  
    posXS = positionBall.posX; 
    posYS = positionBall.posY;
  //  console.log(" La poition excacte est : "+posXS+" "+posYS);
     io.emit('positionBallServ',{posXServ : posXS, posYServ : posYS});
 });
socket.on('positionJ1', positionJ1 => {

    posJ1 = positionJ1.posJ1;
  //  console.log(" La poition excacte est : "+posXS+" "+posYS);
     io.emit('positionJ1Serv',{posJ1Serv : posJ1});
 }


  );

socket.on('positionJ2', positionJ2 => {

    posJ2 = positionJ2.posJ2;
  //  console.log(" La poition excacte est : "+posXS+" "+posYS);
     io.emit('positionJ2Serv',{posJ2Serv : posJ2});
 }


  );

socket.on('ScoreJ1', ScoreJ1 => {

    scoreJ1 = ScoreJ1.ScoreJ1;
  //  console.log(" La poition excacte est : "+posXS+" "+posYS);
     io.emit('ScoreJ1Serv',{ScoreJ1Serv : scoreJ1});
 }


  );


socket.on('ScoreJ2', ScoreJ2 => {

    ScoreJ2 = ScoreJ2.ScoreJ2;
  //  console.log(" La poition excacte est : "+posXS+" "+posYS);
     io.emit('ScoreJ2Serv',{ScoreJ2Serv : ScoreJ2});
 }


  );




socket.on('Score', Score => {

    scoreJ1 = Score.ScoreJ1;
    scoreJ2 = Score.ScoreJ2;
  //  console.log(" La poition excacte est : "+posXS+" "+posYS);
     io.emit('ScoreServ',{ScoreJ1Serv : scoreJ1,ScoreJ2Serv : scoreJ2});
 }


  );







socket.on('Go', Go => {

    
  //  console.log(" La poition excacte est : "+posXS+" "+posYS);
     io.emit('GoJeux',"GoJeux");
 }


  );



     });



/*io.on('connection', (socket) => {
    console.log('a user connected', socket);
    console.log("coucou");
    // -- Build a room
    let room = "room";
    socket.join(room);
    // -- catch disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // -- Conversation stuff
    socket.on('message', (message) => {
        // --- Message treatment :
        if (message.step === 0) {
                   
                   io.to(room).emit('return',message.answer);
               }
              
         
        
        else {
            io.to(room).emit('init');
        }
    });
    // -- First message
    io.to(room).emit('welcome', room);
});*/
http.listen(3010, () => {
    console.info('HTTP server started on port 3010');
});
