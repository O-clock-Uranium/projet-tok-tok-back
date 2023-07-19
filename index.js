require("dotenv").config();
const express = require("express");
const session = require('express-session');
// const jwt = require('jsonwebtoken');
const router = require("./app/router");

const app = express();

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 60 * 60 *24}
}))

app.use(router);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
