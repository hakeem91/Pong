game.control = {
  
  controlSystem : null,
  mousePointer : null,
   mousePointer : null,
   sound : null,
  onKeyDown : function(event) {
          
game.control.controlSystem = "KEYBOARD"
    if ( event.keyCode == game.keycode.SPACEBAR  && !game.ball.inGame && game.gameOn ) { 
     

    }
     game.playerOne.goDown = false;
      game.playerOne.goUp = false;


      

    if ( event.keyCode == game.keycode.KEYDOWN   ) { 
      console.log(game.playerOne.posY);
    game.playerOne.goDown = true;

    }  if ( event.keyCode == game.keycode.KEYUP) { 
            console.log(game.playerOne.posY);

    game.playerOne.goUp = true;

    }


     if ( event.keyCode == game.keycode.Z ) { 
    game.playerTwo.goDown = true;
    }  if ( event.keyCode == game.keycode.S ) { 
    game.playerTwo.goUp = true;
    }
  },
  onStartGameClickButton : function(socket) {
   
    if ( !game.gameOn ) {
       
console.log("clicli cboom");



     


socket.emit('Go', {posJ1 : "game.playerOne.posY"});


socket.on('GoJeux', GoJeux => {
   game.reinitGame();
    game.ball.inGame = true;
      game.ball.posX = game.playerOne.posX + game.playerOne.width;
      game.ball.posY = game.playerOne.posY;
      game.ball.directionX = 1;
      game.ball.directionY = 1;

 });
       game.gameOn = true;

    }
  },
   
  onKeyUp : function(event) {
    if ( event.keyCode == game.keycode.KEYDOWN ) {
      game.playerOne.goDown = false;

    }  if ( event.keyCode == game.keycode.KEYUP ) {
    game.playerOne.goUp = false;

    }

     if ( event.keyCode == game.keycode.Z ) {
      game.playerTwo.goDown = false;
    }  if ( event.keyCode == game.keycode.S ) {
    game.playerTwo.goUp = false;
    }
  },
   
  onMouseMove : function(event) {
    
   game.control.controlSystem = "MOUSE";
 
    if ( event ) {
      game.control.mousePointer = event.clientY;
    }
  
    if ( game.control.mousePointer > game.playerOne.posY  && game.playerOne.posY < game.groundHeight - game.playerOne.height+30 ) {
      game.playerOne.goDown = true;
      game.playerOne.goUp = false;
    } else if ( game.control.mousePointer < game.playerOne.posY && game.playerOne.posY > 0 ) {
      game.playerOne.goDown = false;
      game.playerOne.goUp = true;
    } else {
      game.playerOne.goDown = false;
      game.playerOne.goUp = false;
    }
  }
};