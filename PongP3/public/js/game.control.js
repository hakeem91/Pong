game.control = {
  
  controlSystem : null,
  mousePointer : null,
   mousePointer : null,
   sound : null,
  onKeyDown : function(event) {
          
game.control.controlSystem = "KEYBOARD"
    if ( event.keyCode == game.keycode.SPACEBAR && !game.ball.inGame && game.gameOn ) { 
      console.log(game.gameOn);
      console.log("coucou");
      game.ball.inGame = true;
      game.ball.posX = game.playerOne.posX + game.playerOne.width;
      game.ball.posY = game.playerOne.posY;
      game.ball.directionX = 1;
      game.ball.directionY = 1;

    }
    if ( event.keyCode == game.keycode.KEYDOWN ) { 
    game.playerOne.goDown = true;
    } else if ( event.keyCode == game.keycode.KEYUP ) { 
    game.playerOne.goUp = true;
    }
    else if ( event.keyCode == game.keycode.S ) { 
    game.playerTwo.goDown = true;
    } else if ( event.keyCode == game.keycode.Z ) { 
    game.playerTwo.goUp = true;
    }



    else if ( event.keyCode == game.keycode.E ) { 
    game.playerThree.goDown = true;
    } else if ( event.keyCode == game.keycode.D ) { 
    game.playerThree.goUp = true;
    }


    else if ( event.keyCode == game.keycode.P ) { 
    game.playerFour.goDown = true;
    } else if ( event.keyCode == game.keycode.M ) { 
    game.playerFour.goUp = true;
    }
  },
  onStartGameClickButton : function() {
   
    if ( !game.gameOn ) {
       //this.sound = new Audio("./sound/dvorak.mp3");
    //this.sound.play();
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

    else if ( event.keyCode == game.keycode.S ) {
      game.playerTwo.goDown = false;
    } else if ( event.keyCode == game.keycode.Z ) {
    game.playerTwo.goUp = false;
    }



     else if ( event.keyCode == game.keycode.E ) {
      game.playerThree.goDown = false;
    } else if ( event.keyCode == game.keycode.D ) {
    game.playerThree.goUp = false;
    }

     else if ( event.keyCode == game.keycode.P ) {
      game.playerFour.goDown = false;
    } else if ( event.keyCode == game.keycode.M ) {
    game.playerFour.goUp = false;
    }
  },
   
  onMouseMove : function(event) {
    
    /*game.control.controlSystem = "MOUSE";
 
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
    }*/
  }
};