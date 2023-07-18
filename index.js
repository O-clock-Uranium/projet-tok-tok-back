require("dotenv").config();
const express = require("express");
const app = express();

const router = require("./app/router");
const middleware404 = require("./app/middlewares/middleware404");
const sessionMiddleware = require("./app/middlewares/sessionMiddleware");
const loadSessionUserInLocals = require("./app/middlewares/loadSessionUserInLocals");


app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(sessionMiddleware);

app.use(loadSessionUserInLocals);

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(router);

app.use(middleware404);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
