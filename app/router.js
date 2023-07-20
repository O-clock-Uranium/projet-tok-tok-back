const { Router } = require("express");

const sanitize = require("./middlewares/sanitize");
const sanitizeNew = require("./middlewares/sanitizeNew");
const verifyJWT = require("./middlewares/verifyJWT");
//* middleware pour vérifier si un user est loggué
//const isAuthed = require("./middlewares/rights");
//* middleware pour vérifier la présence et la validité d'un token

const {
  authController,
  postController,
  userController,
  advertController,
  messageController,
  favouriteController,
  likeController,
} = require("./controllers/index");

const router = Router();

/**
 *! Routes de l'API
 router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.
 */

/**
 * ! Not a good practice
 * Toutes les requêtes passent par ce middleware qui sanitize toutes les données même si elles ne sont pas sensibles.
 * On peut donc le mettre sur les routes qui en ont besoin.
 * Exemple: POST /posts
 * sanitizeNew
 */
// router.post("*", sanitize);
// router.patch("*", sanitize);

/* login/signup -----------------------------------------------------------------*/
router.post("/login", authController.login);
router.post("/signup", authController.signup);

/* Posts -----------------------------------------------------------------*/
router.get("/posts", postController.getAll);
router.post("/posts", sanitizeNew("content"), postController.createPost);
router.patch("/posts/:id", postController.update);
router.delete("/posts/:id", postController.remove);

/* Users -----------------------------------------------------------------*/
router.get("/users", userController.getOne);
router.patch("/users/edit-profile", userController.update); //-> pour la page "paramètres"
router.delete("/users/delete-account", userController.deleteUser);

/* Adverts ---------------------------------------------------------------*/
router.get("/adverts/", advertController.getAll);
router.get("/adverts/:id", advertController.getOne);
router.post("/adverts", advertController.create);
router.patch("/adverts/:id", advertController.update);
router.delete("/adverts/:id", advertController.remove);

/* Messages
--------------------------------------------------------------*/
router.get("/messages", messageController.getMessages);
router.get("/messages/:id", messageController.displayAllConversation);
router.post("/messages/:id", messageController.sendMessage);
/* Favourites --------------------------------------------------------------*/
router.get("/users/favourites", favouriteController.getAll);
router.post("/users/favourites/:advertId", favouriteController.add);
router.delete("/users/favourites/:advertId", favouriteController.remove);

/*Likes
-------------------------------------------------------------*/
router.post("/users/likes/:postId", likeController.add);
router.delete("/users/likes/:postId", likeController.remove);

module.exports = router;
