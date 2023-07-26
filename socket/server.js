const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = 3001;

let id = 0;

io.on("connection", (ws) => {
  console.log(">> socket.io - connected");
  ws.on("client_send_message", (message) => {
    // eslint-disable-next-line no-plusplus
    message.id = ++id;
    io.emit("server_send_message", message);
  });
});


server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
