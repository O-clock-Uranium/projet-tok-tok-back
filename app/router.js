const {Router} = require("express");
const controllers = require("./controllers/index");

const {isAuthed} = require("./middlewares/index");

const router = Router();


//! Voir avec la chef sur quel route mettre isAuthed (j'ai pour le moment mis dans tous sauf login/signup)
//! et aussi si on le fait côté front ou back
/**
 * Routes de l'API
 */
// router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.

/* login/signup -----------------------------------------------------------------*/
router.post('/login', controllers.authController.handleLogin);
router.post('/signup', controllers.authController.handleSignup);

/* Posts -----------------------------------------------------------------*/
router.get('/posts',isAuthed, controllers.postController.getAllPosts);

/* Users -----------------------------------------------------------------*/
router.get('/users/:id',isAuthed, controllers.userController.getOneUser);
router.patch('/users/:id/edit-profile', isAuthed, controllers.userController.updateUser); //-> pour la page "paramètres"
router.delete('/users/:id/delete-account', isAuthed, controllers.userController.deleteUser);

/* Adverts ---------------------------------------------------------------*/
router.get('/adverts/',isAuthed, controllers.advertController.getAll);
router.get('/adverts/:id',isAuthed, controllers.advertController.getOne);
router.post('/adverts',isAuthed, controllers.advertController.createAdvert);
router.patch('/adverts/:id',isAuthed, controllers.advertController.updateAdvert);
router.delete('/adverts/:id',isAuthed, controllers.advertController.deleteAdvert);

/* Messages
--------------------------------------------------------------*/
router.get('/messages',isAuthed, controllers.messageController.getUserMessage);
router.get('/messages/:id',isAuthed, controllers.messageController.displayAllConversation);
router.post('/messages/:id',isAuthed, controllers.messageController.sendMessage);

/* Favourites --------------------------------------------------------------*/
router.get('/users/:id/favourites',isAuthed, controllers.favouriteController.getAllFavourites);
router.post('/users/:userId/favourites/:advertId',isAuthed, controllers.favouriteController.addToFavourites);
router.delete('/users/:userId/favourites/:advertId',isAuthed, controllers.favouriteController.removeFromFavourites);

/*Likes
-------------------------------------------------------------*/
router.post('/users/:userId/likes/:postId',isAuthed, controllers.likeController.addToLikes);
router.delete('/users/:userId/likes/:postId',isAuthed, controllers.likeController.removeFromLikes);


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
