const { verifyJWT } = require("./verifyAuthMiddleware");
const messageCtrl = require("../controllers/messageController");
// const verifyJWT = require("./verifyAuthMiddleware");

module.exports = (io) => {
  // Utiliser le middleware "socketverify" pour vérifier l'authentification des connexions WebSocket
  io.use(verifyJWT);

  // Gérer les événements lorsque des utilisateurs se connectent au serveur WebSocket
  io.on('connection', (socket) => {
    console.log('a user connected'); // Afficher un message dans la console lorsque l'utilisateur se connecte
    console.log(socket.user); // Afficher les informations de l'utilisateur authentifié (défini grâce au middleware "socketverify")

    // Gérer l'événement 'message' lorsque le client envoie un message au serveur via la connexion WebSocket
    socket.on('message', (message) => {
      // Appeler la fonction "sendMessage" du contrôleur "messageCtrl" pour envoyer le message
      // La fonction prend en paramètres le message, les informations de l'utilisateur (socket.user) et l'instance de Socket.IO (io)
      messageCtrl.sendMessage(message, socket.user, io);

      // Remarque : Si vous cherchez une manière plus propre de passer l'ID utilisateur à la fonction "sendMessage",
      // vous pouvez utiliser le champ 'data' de l'événement 'message' pour inclure l'ID utilisateur.
      // Par exemple : socket.on('message', (data) => { messageCtrl.sendMessage(data.message, data.userId, io); });
    });

    // Gérer l'événement 'join' lorsque le client souhaite rejoindre un salon (channel) spécifique
    socket.on('join', (id) => {
      // Appeler la fonction "joinRoom" du contrôleur "messageCtrl" pour permettre à l'utilisateur de rejoindre le salon spécifié par l'ID
      messageCtrl.joinRoom(id, socket);
      console.log('joined chan-' + id); // Afficher un message dans la console lorsque l'utilisateur rejoint le salon
    });

    // Gérer l'événement 'leave' lorsque le client souhaite quitter un salon (channel) spécifique
    socket.on('leave', (id) => {
      socket.leave('chan-' + id); // Utiliser la méthode "leave" pour retirer l'utilisateur du salon spécifié par l'ID
      console.log('left chan-' + id); // Afficher un message dans la console lorsque l'utilisateur quitte le salon
    });
  });
};
