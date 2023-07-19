const {Router} = require("express");
const controllers = require("./controllers/index");
const sanitize = require('./middlewares/sanitize');
//* middleware pour vérifier si un user est loggué
//const isAuthed = require("./middlewares/rights");
//* middleware pour vérifier la présence et la validité d'un token
const verifyJWT = require("./middlewares/verifyJWT");

const router = Router();

/**
 *! Routes de l'API
 router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.
 */

router.post('*', sanitize);
router.patch('*', sanitize);

/* login/signup -----------------------------------------------------------------*/
router.post('/login', controllers.authController.handleLogin);
router.post('/signup', controllers.authController.handleSignup);

/* Posts -----------------------------------------------------------------*/
router.get('/posts', controllers.postController.getAllPosts);
router.post('/posts', controllers.postController.createPost);
router.patch('/posts/:id', controllers.postController.updatePost);
router.delete('/posts/:id', controllers.postController.deletePost);


/* Users -----------------------------------------------------------------*/
router.get('/users/:id', controllers.userController.getOneUser);
router.patch('/users/:id/edit-profile', controllers.userController.updateUser); //-> pour la page "paramètres"
router.delete('/users/:id/delete-account', controllers.userController.deleteUser);

/* Adverts ---------------------------------------------------------------*/
router.get('/adverts/', controllers.advertController.getAll);
router.get('/adverts/:id', controllers.advertController.getOne);
router.post('/adverts', controllers.advertController.createAdvert);
router.patch('/adverts/:id', controllers.advertController.updateAdvert);
router.delete('/adverts/:id', controllers.advertController.deleteAdvert);

/* Messages
--------------------------------------------------------------*/
router.get('/messages', controllers.messageController.getUserMessage);
router.get('/messages/:id', controllers.messageController.displayAllConversation);
router.post('/messages/:id', controllers.messageController.sendMessage);

/* Favourites --------------------------------------------------------------*/
router.get('/users/:id/favourites', controllers.favouriteController.getAllFavourites);
router.post('/users/:userId/favourites/:advertId', controllers.favouriteController.addToFavourites);
router.delete('/users/:userId/favourites/:advertId', controllers.favouriteController.removeFromFavourites);

/*Likes
-------------------------------------------------------------*/
router.post('/users/:userId/likes/:postId', controllers.likeController.addToLikes);
router.delete('/users/:userId/likes/:postId', controllers.likeController.removeFromLikes);


module.exports = router;
