var room = undefined;
var game = {
  groundWidth : 700,
  groundHeight : 400,
  groundColor : "#000000",
  netColor : "#FFFFFF",
  netWidth : 6,
  groundLayer : null,  
  scoreLayer : null,
  playersBallLayer : null,
  scorePosPlayer1 : 300,
  scorePosPlayer2 : 365,
    wallSound : null,
  playerSound : null,
playerSound2 : null,
divGame : null,
gameOn : false,
startGameButton : null,
playerOne : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 10,
    posY : 200,
    goUp : false,
    goDown : false,
    originalPosition : "left",
    score : 0,
    ai : false

  },
    
  playerTwo : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 680,
    posY : 200,
    goUp : false,
    goDown : false,
        originalPosition : "right",
    score : 0,
    ai : true

  },










playerThree : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 10,
    posY : 300,
    goUp : false,
    goDown : false,
    originalPosition : "left",
    score : 0,
    ai : false

  },
    
  playerFour : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 680,
    posY : 30,
    goUp : false,
    goDown : false,
        originalPosition : "right",
    score : 0,
    ai : true

  },










  ball : {
    width : 10,
    height : 10,
    color : "#FFFF00",
    posX : 200,
    posY : 200,
    speed : 5,
    directionX : 1,
    directionY : 1,
    inGame : false,


 

lost : function(player) {
    var returnValue = false;
    if ( player.originalPosition == "left" && this.posX < player.posX - this.width ) {
      returnValue = true;
    } else if ( player.originalPosition == "right" && this.posX > player.posX + player.width ) {
      returnValue = true;
    }
    return returnValue;
  },
  
    bounce : function(soundToPlay) {
      if ( this.posX > game.groundWidth || this.posX < 0 ){
        this.directionX = -this.directionX;
      }

      if ( this.posY > game.groundHeight || this.posY < 0  ){
        this.directionY = -this.directionY;      
      }

    },
    move : function(socket) {
      if (this.inGame){
        socket.on('positionJ4Serv', positionJ4Serv => {
              game.playerFour.posY = positionJ4Serv.posJ4Serv; 
        });
        socket.on('positionJ3Serv', positionJ3Serv => {
              game.playerThree.posY = positionJ3Serv.posJ3Serv; 
         });
         socket.on('positionJ2Serv', positionJ2Serv => {
              game.playerTwo.posY = positionJ2Serv.posJ2Serv; 
         });
       socket.on('positionJ1Serv', positionJ1Serv => {
              game.playerOne.posY = positionJ1Serv.posJ1Serv; 
        });
       socket.on('ScoreServ', ScoreServ => {
              game.scoreLayer.clear();
              game.displayScore(ScoreServ.ScoreJ1Serv, ScoreServ.ScoreJ2Serv);
        });




      if (socket.id == game.playerOne.socketOne){
      this.posX += this.directionX * this.speed;
      this.posY += this.directionY * this.speed;
      socket.emit('positionBall', {posX : this.posX, posY : this.posY});
}
      socket.on('positionBallServ', positionBallServ => {
       if (  positionBallServ.posXServ>  game.playerTwo.posx + game.playerTwo.width){
            this.inGame = false;
            setTimeout(game.ai.startBall(), 3000)
       }

this.posX = positionBallServ.posXServ;
this.posY = positionBallServ.posYServ;
 
          });


  }


         
    //}
    },
    collide : function(anotherItem) {
      if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
        // Collision
        return true;
      } 
      return false;
    }

  },
  
 
  init : function(socket) {
    this.divGame = document.getElementById("divGame");
   this.startGameButton = document.getElementById("startGame");
   this.startGameButton.addEventListener('click', function() { 
            game.control.onStartGameClickButton(socket); 
       
        }); 
  
  this.groundLayer= game.display.createLayer("terrain", this.groundWidth, this.groundHeight, this.divGame, 0, "#000000", 10, 50); 
  game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
     
  this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, this.divGame, 1, undefined, 10, 50);
  game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);
     
  this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, this.divGame, 2, undefined, 10, 50);  
  game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);
     
  this.displayScore(0,0);
  this.displayBall(200,200);
  this.displayPlayers();
    
  this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
  this.initMouse(game.control.onMouseMove);
   
  this.wallSound = new Audio("./sound/wall.ogg");
  this.playerSound = new Audio("./sound/player.ogg");
   this.playerSound2 = new Audio("./sound/player.ogg");
     game.ai.setPlayerAndBall(this.playerTwo, this.ball);

 game.reinitGame();
    game.ball.inGame = true;
      game.ball.posX = game.playerOne.posX + game.playerOne.width;
      game.ball.posY = game.playerOne.posY;
      game.ball.directionX = 1;
      game.ball.directionY = 1;

  game.ai.setPlayerAndBall(this.playerTwo, this.ball);
  },

  displayScore : function(scorePlayer1, scorePlayer2) {
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
  },
  displayBall : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
  },
  displayPlayers : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);

    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);
  },
  moveBall : function(socket) { 
    this.ball.move(socket);
    this.ball.bounce(this.wallSound);
    this.displayBall();
  }, 
  clearLayer : function(targetLayer) {
    targetLayer.clear();
  },
  initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
    window.onkeydown = onKeyDownFunction;
    window.onkeyup = onKeyUpFunction;
  },
  movePlayers : function(socket) {
    if ( game.control.controlSystem == "KEYBOARD" ) {
      // keyboard control

      if ( game.playerOne.goUp ) {
      
          if (socket.id == game.playerOne.socketOne){
            if (game.playerOne.posY >0)
            game.playerOne.posY-=5;//}
            socket.emit('positionJ1', {posJ1 : game.playerOne.posY});
           }




        
      } else if ( game.playerOne.goDown ) {
               

        if (socket.id == game.playerOne.socketOne){
                 if (game.playerOne.posY  < game.groundHeight - game.playerOne.height)
                 game.playerOne.posY+=5;//}
                socket.emit('positionJ1', {posJ1 : game.playerOne.posY});
       }

         

      }
      else if ( game.playerTwo.goDown ) {
               
                if (socket.id == game.playerTwo.socketTwo){
                    if (game.playerTwo.posY >0)
                   game.playerTwo.posY-=5;//}
                   socket.emit('positionJ2', {posJ2 : game.playerTwo.posY});
       }


      }
      else if ( game.playerTwo.goUp ) {
               

        if (socket.id == game.playerTwo.socketTwo){
                  if (game.playerTwo.posY  < game.groundHeight - game.playerTwo.height)
                  game.playerTwo.posY+=5;//}
                  socket.emit('positionJ2', {posJ2 : game.playerTwo.posY});
       }

}


      else if ( game.playerThree.goDown ) {
               
        if (socket.id == game.playerThree.socketThree){
                if (game.playerThree.posY >0)
                game.playerThree.posY-=5;//}
               socket.emit('positionJ3', {posJ3 : game.playerThree.posY});
       }


      }
      else if ( game.playerThree.goUp ) {
               

        if (socket.id == game.playerThree.socketThree){
               if (game.playerThree.posY  < game.groundHeight - game.playerThree.height)
              game.playerThree.posY+=5;//}
              socket.emit('positionJ3', {posJ3 : game.playerThree.posY});
       }



}

      else if ( game.playerFour.goDown ) {
               
        if (socket.id == game.playerFour.socketFour){
               if (game.playerFour.posY >0)
              game.playerFour.posY-=5;//}
              socket.emit('positionJ4', {posJ4 : game.playerFour.posY});
       }

      }
      else if ( game.playerFour.goUp ) {
               
        if (socket.id == game.playerFour.socketFour){
            if (game.playerFour.posY  < game.groundHeight - game.playerFour.height)
            game.playerFour.posY+=5;//}
            socket.emit('positionJ4', {posJ4 : game.playerFour.posY});
       }




    }
    } else if ( game.control.controlSystem == "MOUSE" ) {
      // mouse control
        if (game.playerOne.goUp && game.playerOne.posY > game.control.mousePointer){
        game.playerOne.posY-=5;
      }
        else if (game.playerOne.goDown && game.playerOne.posY < game.control.mousePointer){
        game.playerOne.posY+=5;
      }
    }
  },
  socketOne : function(users) {
    if (users[0]!=null){
    this.playerOne.socketOne = users[0];
  }
  else {
    return;
  }
  },
  socketTwo : function(users) {
    if (users[2]!=null){
    this.playerTwo.socketTwo = users[2];
  }
else {
  return;
}
},




 socketThree : function(users) {
    if (users[4]!=null){
    this.playerThree.socketThree = users[4];
  }
  else {
    return;
  }
  },
  socketFour : function(users) {
    if (users[6]!=null){
    this.playerFour.socketFour = users[6];
  }
  else {
    return;
  }
},



  initMouse : function(onMouseMoveFunction) {
    window.onmousemove = onMouseMoveFunction;
  },
 lostBall : function(socket) {
    var score1v =0;
    var score2v =0;
    var score1 = game.playerOne.score;
    var score2 = game.playerTwo.score;
  if ( this.ball.lost(this.playerOne) ) {
       
      if(socket.id == game.playerOne.socketOne)
      this.playerTwo.score++;


      if ( this.playerTwo.score > 4 ) {
       this.reinitGame();
      } 
    this.ball.inGame = false;
    
    if(socket.id == game.playerOne.socketOne)
   socket.emit('Score', {ScoreJ1: this.playerOne.score, ScoreJ2 : this.playerTwo.score});

      socket.on('ScoreServ', ScoreServ => {
 
      if (ScoreServ.ScoreJ1Serv != null){
           score1v = ScoreServ.ScoreJ1Serv;
      }

      if (ScoreServ.ScoreJ2Serv != null){
           score2v = ScoreServ.ScoreJ2Serv;
      }

     this.scoreLayer.clear();
      this.displayScore(score1v, score2v);
      game.ball.inGame = true;
      game.ball.posX = game.playerOne.posX + game.playerOne.width;
      game.ball.posY = game.playerOne.posY;
      game.ball.directionX = 1;
      game.ball.directionY = 1;
});
      setTimeout(game.ai.startBall(), 3000);
    
  } 


  else if ( this.ball.lost(this.playerTwo) ) {

        this.playerOne.score++;
        this.ball.inGame = false;
   
        if ( this.playerOne.score > 4 ) {
          this.reinitGame();
        
        } 
      if(socket.id == game.playerOne.socketOne)
      socket.emit('Score', {ScoreJ1: this.playerOne.score, ScoreJ2 : this.playerTwo.score});

      socket.on('ScoreServ', ScoreServ => {
 
        if (ScoreServ.ScoreJ1Serv != null){
           score1v = ScoreServ.ScoreJ1Serv;
        }

         if (ScoreServ.ScoreJ2Serv != null){
           score2v = ScoreServ.ScoreJ2Serv;
        }
      this.scoreLayer.clear();
      this.displayScore(score1v, score2v);
      game.ball.inGame = true;
      game.ball.posX = game.playerOne.posX + game.playerOne.width;
      game.ball.posY = game.playerOne.posY;
      game.ball.directionX = 1;
      game.ball.directionY = 1;
});
      setTimeout(game.ai.startBall(), 3000);
    
  }
  
  
},
initStartGameButton : function() {
    this.startGameButton.onclick = game.control.onStartGameClickButton;
  },
  reinitGame : function() {
    this.ball.inGame = false;
    this.playerOne.score = 0;
    this.playerTwo.score = 0;
    this.scoreLayer.clear();
    this.displayScore(this.playerOne.score, this.playerTwo.score);
  },
  collideBallWithPlayersAndAction : function() { 
    if ( this.ball.collide(game.playerOne) ){
      game.ball.directionX = -game.ball.directionX;
    }

    if ( this.ball.collide(game.playerTwo) ){
      game.ball.directionX = -game.ball.directionX;
    }



    if ( this.ball.collide(game.playerThree) ){
      game.ball.directionX = -game.ball.directionX;
    }

    if ( this.ball.collide(game.playerFour) ){
      game.ball.directionX = -game.ball.directionX;
    }

  }
 
};