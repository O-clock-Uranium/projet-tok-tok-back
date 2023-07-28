// const message = require("../models/index");

// // Fonction pour envoyer un message dans un salon (channel) spécifique
// exports.sendMessage = async function (message, user, io) {
//   try {
//     const { content, channel_id } = message;

//     // Vérifier si le contenu du message est vide, si c'est le cas, ne rien faire
//     if (!content) {
//       return null;
//     }

//     // Envoyer le message à la base de données (dataMapper)
//     const messageDB = await message.send(user.id, channel_id, content);

//     // Diffuser le message à tous les utilisateurs connectés au salon (channel) spécifié
//     io.to("chan-" + channel_id).emit("message", messageDB);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Fonction pour rejoindre un salon (channel)
// exports.joinRoom = async function (id, socket) {
//   try {
//     // Vérifier si l'utilisateur a le droit de rejoindre le salon
//     const check = await message.userTest(socket.user.id, id);

//     // Si l'utilisateur a le droit, le faire rejoindre le salon (channel)
//     if (check) {
//       socket.join("chan-" + id);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Fonction pour récupérer les messages d'un salon (channel) spécifique
// exports.getMessages = async function (req, res) {
//   try {
//     // Obtenir la date de référence pour récupérer les messages (peut être spécifiée dans la requête)
//     const timestamp = new Date(req.query.time || Date.now());

//     // Obtenir la liste des messages du salon (channel) spécifié à partir de la base de données (dataMapper)
//     const list = await message.getMessages(req.userToken.id, req.params.id, timestamp);

//     // Renvoyer la liste des messages au client
//     res.status(200).json(list);
//   } catch (err) {
//     // Gérer les erreurs en fonction du type d'erreur
//     if (err.message === 'user not in channel') {
//       return res.status(403).json({ errcode: 21, err: "not enough rights" });
//     }
//     res.status(500).json({ errcode: 0, err: "server error" });
//     console.log(err);
//   }
// };
