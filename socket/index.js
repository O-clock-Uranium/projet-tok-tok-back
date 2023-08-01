const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // port d'écoute du front
    methods: ["GET", "POST"], // méthodes autorisées
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  // l'utilisateur émet l'événement 'join room' -> il s'abonne à cette room
  // -> il reçoit alors les messages en direct
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // un utilisateur émet un message
  socket.on("client_send_message", (data) => {
    //TODO ici on devra faire un Message.create(data) ou appeler le controller 

    // le serveur renvoie cet événement aux personnes connectées à la room
    socket.to(data.room).emit("server_send_message", data);

    // console.log(data);
    // console.log("data room:", data.room.length);
    
    //* ça c'était juste pour test
    if (!data.room.length) {
      socket.emit("server_send_message", data);
    }

  });
});

// 3000 déjà occupé.
// On se connecte à ce port en front aussi.
server.listen(3001, () => {
  console.log(":>:> Server socket.io running on port 3001");
});
