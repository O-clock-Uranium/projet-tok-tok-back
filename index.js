require("dotenv").config();
const express = require("express");
const router = require("./app/router");
const middleware404 = require("./app/middlewares/middleware404");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(router);

app.use(middleware404);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
