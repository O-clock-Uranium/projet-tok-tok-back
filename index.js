const express = require("express");
const app = express();
const PORT = 5050;
const router = require('./router');
app.use(router)

app.set("view engine", "ejs");
app.set("views", __dirname + "/app/views");

app.use(express.static(__dirname + "/static"));



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
