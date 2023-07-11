require("dotenv").config();
const express = require("express");
const app = express();

const router = require("./app/router");

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/app/views");

app.use(express.static(__dirname + "/static"));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
