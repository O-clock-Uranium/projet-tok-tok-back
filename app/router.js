const {Router} = require("express");
const postController = require("./controllers/postController");
const advertsController = require("./controllers/advertsController");
const messageController = require("./controllers/messageController");
const userController = require("./controllers/UserControlleur");

const router = Router();

/**
 * Routes de l'API
 */
// router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.

/* Posts -----------------------------------------------------------------*/
router.get('/posts', postController.getAllPosts);

/* Users -----------------------------------------------------------------*/
router.get('/users', userController.getOneUser);

/* Adverts ---------------------------------------------------------------*/
router.get('/adverts', advertsController.getAllAdverts);

/* Messages --------------------------------------------------------------*/
// router.get('/messages', messageController.getAllMessage);

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
