const {Router} = require("express");
const controllers = require("./controllers/index");

const router = Router();

/**
 * Routes de l'API
 */
// router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.

/* login/signup -----------------------------------------------------------------*/
router.post('/login', controllers.authController.handleLogin);
router.post('/signup', controllers.authController.handleSignup);


/* Posts -----------------------------------------------------------------*/
router.get('/posts', controllers.postController.getAllPosts);

/* Users -----------------------------------------------------------------*/
router.get('/users/:id', controllers.userController.getOneUser);
router.patch('/users/:id/edit-profile', controllers.userController.updateUser);
router.delete('/users/:id/delete-account', controllers.userController.deleteUser);




/* Adverts ---------------------------------------------------------------*/
router.get('/adverts/', controllers.advertController.getAll);
router.get('/adverts/:id', controllers.advertController.getOne);
router.post('/adverts', controllers.advertController.createAdvert);
router.patch('/adverts/:id', controllers.advertController.updateAdvert);
router.delete('/adverts/:id', controllers.advertController.deleteAdvert);


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
