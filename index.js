require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {

  cors: {
    origin: '*',
  },
});

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const socketHandler = require('./app/middlewares/socket.js');
const router = require('./app/router');
app.use(router);
app.use((req, res) => res.status(404).send('route not defined'));
socketHandler(io);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


// require("dotenv").config();

// const cors = require("cors");
// const express = require("express");
// const middleware404 = require("./app/middlewares/middleware404");
// const router = require("./app/router");
// //const socket = require('./socket/server');

// const app = express();

// /**
//  * Autorise les requêtes provenant de n'importe quelle origine (localhost, herokuapp, etc.)
//  * @see https://www.npmjs.com/package/cors#simple-usage-enable-all-cors-requests
//  */
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// app.use(express.static('public'));

// //TODO clean -> décomposer le router en sous-router
// app.use(router);

// app.use(middleware404);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
