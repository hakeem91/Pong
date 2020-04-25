class IoController {
 
   constructor() {  }
   registerSocket( socket) {
   	
   	
   	 socket.emit('welcome', 'this is a welcome message');
      socket.on('player', player => console.log(`welcome ${socket.id}`) );  // "écoute" côté serveur des messages 'player' émis par cocket
      var idJoueur = socket.id;
       socket.emit('idJoueur', idJoueur);  // "écoute" côté serveur des messages 'player' émis par cocket

   }

}
module.exports = new IoController() ;