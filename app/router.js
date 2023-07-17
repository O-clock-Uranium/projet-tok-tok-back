const {Router} = require("express");
const mainController = require("./controllers/mainController");
const postController = require("./controllers/postController");

const router = Router();


router.get("/",mainController.homepage);

router.get("/Accueil_Membre", mainController.tag );

/**
 * Routes de l'API
 */

router.get('/posts', postController.getAllPosts);
router.get('/users', postController.getAllUsers);


// app.get("/Annonces", (req, res) => {
//   res.render("Annonces.ejs", {});
// });

// app.get("/Annonce", (req, res) => {
//   res.render("Annonce.ejs", {});
// });

// app.get("/Creer_une_Annonce", (req, res) => {
//   res.render("Creer_une_Annonce.ejs", {});
// });

// app.get("/Favoris", (req, res) => {
//   res.render("Favoris.ejs", {});
// });

// app.get("/Messagerie", (req, res) => {
//   res.render("Messagerie.ejs", {});
// });

// app.get("/Settings(mobile)", (req, res) => {
//   res.render("Settings(mobile).ejs", {});
// });

module.exports = router;
