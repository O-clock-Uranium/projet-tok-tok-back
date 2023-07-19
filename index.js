require("dotenv").config();
const express = require("express");
const session = require('express-session');
// const jwt = require('jsonwebtoken');
const router = require("./app/router");
const middleware404 = require("./app/middlewares/middleware404");
const sessionMiddleware = require("./app/middlewares/sessionMiddleware");
const loadSessionUserInLocals = require("./app/middlewares/loadSessionUserInLocals");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 60 * 60 *24}
}))
app.use(sessionMiddleware);

app.use(loadSessionUserInLocals);

app.use(router);

app.use(middleware404);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
