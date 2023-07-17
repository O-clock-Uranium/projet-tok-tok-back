require("dotenv").config();
const express = require("express");
const app = express();

const router = require("./app/router");

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.use(router);



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
