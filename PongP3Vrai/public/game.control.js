game.control = {
  
  controlSystem : null,
  mousePointer : null,
   mousePointer : null,
  onKeyDown : function(event) {
          

    if ( event.keyCode == game.keycode.SPACEBAR && !game.ball.inGame && game.gameOn ) { 
      console.log(game.gameOn);
      console.log("coucou");
      game.ball.inGame = true;
      game.ball.posX = game.playerOne.posX + game.playerOne.width;
      game.ball.posY = game.playerOne.posY;
      game.ball.directionX = 1;
      game.ball.directionY = 1;
    }
  },
  onStartGameClickButton : function() {
    console.log("coucou");
    if ( !game.gameOn ) {
      game.reinitGame();
      game.gameOn = true;
    }
  },
   
  onKeyUp : function(event) {
    if ( event.keyCode == game.keycode.KEYDOWN ) {
      game.playerOne.goDown = false;
    } else if ( event.keyCode == game.keycode.KEYUP ) {
    game.playerOne.goUp = false;
    }
  },
   
  onMouseMove : function(event) {
    
    game.control.controlSystem = "MOUSE";
 
    if ( event ) {
      game.control.mousePointer = event.clientY;
    }
  
    if ( game.control.mousePointer > game.playerOne.posY ) {
      game.playerOne.goDown = true;
      game.playerOne.goUp = false;
    } else if ( game.control.mousePointer < game.playerOne.posY ) {
      game.playerOne.goDown = false;
      game.playerOne.goUp = true;
    } else {
      game.playerOne.goDown = false;
      game.playerOne.goUp = false;
    }
  }
};