const {Router} = require("express");
const {controllers} = require("./controllers/index");

const router = Router();

/**
 * Routes de l'API
 */
// router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.

/* Posts -----------------------------------------------------------------*/
router.get('/posts', controllers.postController.getAllPosts);

/* Users -----------------------------------------------------------------*/
router.get('/users/:id', userController.getOneUser);
router.post('/users', userController.createOne);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);




/* Adverts ---------------------------------------------------------------*/
router.get('/adverts', controllers.advertsController.getAllAdverts);

/* Messages --------------------------------------------------------------*/
//router.get('/messages', messageController.getAllMessage);

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
