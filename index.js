require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

/**
 * Autorise les requêtes provenant de n'importe quelle origine (localhost, herokuapp, etc.)
 * @see https://www.npmjs.com/package/cors#simple-usage-enable-all-cors-requests
 */
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

//TODO clean -> décomposer le router en sous-router
app.use(require("./app/router"));

app.use(require("./app/middlewares/404Middleware"));

// Listen for new connections to Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = {
  app,
  io
};
