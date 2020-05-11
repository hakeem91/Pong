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
    height : 55,
    color : "#FFFFFF",
    posX : 5,
    posY : 200,
    goUp : false,
    goDown : false,
    originalPosition : "left",
    score : 0,
    ai : false

  },
    
  playerTwo : {
    width : 10,
    height : 55,
    color : "#FFFFFF",
    posX : 685,
    posY : 200,
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
    if ( player.originalPosition == "left" && this.posX < 10 ) {
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
       if (  positionBallServ.posXServ>  game.playerTwo.posX+game.playerTwo.width){
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
   this.playerSound2 = new Audio("./sound/player.ogg");

  game.ai.setPlayerAndBall(this.playerTwo, this.ball);
 
   game.reinitGame();
    game.ball.inGame = true;
      game.ball.posX = game.playerOne.posX + game.playerOne.width;
      game.ball.posY = game.playerOne.posY;
      game.ball.directionX = 1;
      game.ball.directionY = 1;

 
       game.gameOn = true;

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
   
      }  
  if ( game.playerOne.goDown ) {
               

              if (socket.id == game.playerOne.socketOne){

             if (game.playerOne.posY  < game.groundHeight - game.playerOne.height)
                 game.playerOne.posY+=5;//}

            socket.emit('positionJ1', {posJ1 : game.playerOne.posY});
       }
      }
       
               
        if (socket.id === game.playerTwo.socketTwo){
          if ( game.playerTwo.goDown ) {
          if (game.playerTwo.posY >0)
        game.playerTwo.posY-=5;//}

         socket.emit('positionJ2', {posJ2 : game.playerTwo.posY});
     }
   }


      
               

  if (socket.id === game.playerTwo.socketTwo){
                 if ( game.playerTwo.goUp ) {

                 if (game.playerTwo.posY  < game.groundHeight - game.playerTwo.height)
        this.playerTwo.posY+=5;//}


         socket.emit('positionJ2', {posJ2 : game.playerTwo.posY});
       }
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
  updateScore: function(score1,score2){
this.playerOne.score=score1;
this.playerTwo.score=score2;

this.scoreLayer.clear();
      this.displayScore(this.playerOne.score, this.playerTwo.score);

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
    else {

    this.ball.inGame = false;
    }
    if(socket.id == game.playerOne.socketOne)
      socket.emit('Score', {ScoreJ1: this.playerOne.score, ScoreJ2 : this.playerTwo.score});
 
      setTimeout(game.ai.startBall(), 3000);
    

  }
  else if ( this.ball.lost(this.playerTwo) ) {
     if(socket.id == game.playerOne.socketOne)
      this.playerOne.score++;

      if ( this.playerOne.score > 4 ) {
       this.reinitGame();

      } else {
        this.ball.inGame = false
      }

      if(socket.id == game.playerOne.socketOne)
    socket.emit('Score', {ScoreJ1: this.playerOne.score, ScoreJ2 : this.playerTwo.score});

      setTimeout(game.ai.startBall(), 3000);
    
  }
  
  
},
initStartGameButton : function(socket) {
    this.startGameButton.onclick = game.control.onStartGameClickButton(socket);
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

  }
 
};