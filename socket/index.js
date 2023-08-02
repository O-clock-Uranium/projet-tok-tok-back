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

  socket.emit("server_send_personal_id", {id: socket.id})

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("client_send_message", (data) => {

    socket.to(data.room).emit("server_send_message", data);

    //* ça c'était juste pour test
    // if (!data.room.length) {
    //   socket.broadcast.emit("server_send_message", data);
    // }
  });
  
  socket.on("disconnect", () => {
  console.log(`user disconnected`);
});
});


server.listen(3001, () => {
  console.log(":>:> Server socket.io running on port 3001");
});
