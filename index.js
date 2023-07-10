const express = require('express');
const PORT = 5050;
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {

  res.render('Homepage_Membre.ejs', {
    root:  __dirname + '/app/views'
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});