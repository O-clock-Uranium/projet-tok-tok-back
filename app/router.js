const { Router } = require("express");

//const sanitize = require("./middlewares/sanitize");
const sanitizeNew = require("./middlewares/sanitizeNew");
const verifyJWT = require("./middlewares/verifyJWT");
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
 * TODO:
 * - Routes de l'API : router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.
 * - regrouper les routes similaires en routers
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
router.get("/posts", verifyJWT, postController.getAll);
router.post(
  "/posts",
  verifyJWT,
  sanitizeNew("content"),
  postController.createPost
);
router.patch(
  "/posts/:id",
  verifyJWT,
  sanitizeNew("content"),
  postController.update
);
router.delete("/posts/:id", verifyJWT, postController.remove);

/* Users -----------------------------------------------------------------*/
router.get("/profile/:id", verifyJWT, userController.getOne); //TODO route pour MON profil ?
router.patch(
  "/my-profile/edit",
  verifyJWT,
  sanitizeNew("description"),
  userController.update
); //-> pour la page "paramètres"
router.delete("/my-profile/delete", verifyJWT, userController.deleteUser);

/* Adverts ---------------------------------------------------------------*/
router.get("/adverts", verifyJWT, advertController.getAll);
router.get("/adverts/:id", verifyJWT, advertController.getOne);
router.post(
  "/adverts",
  verifyJWT,
  sanitizeNew("content"),
  advertController.create
);
router.patch(
  "/adverts/:id",
  verifyJWT,
  sanitizeNew("content"),
  advertController.update
);
router.delete("/adverts/:id", verifyJWT, advertController.remove);

/* Messages
--------------------------------------------------------------*/
router.get("/messages", verifyJWT, messageController.getMessages);
router.get(
  "/messages/:id",
  verifyJWT,
  messageController.displayAllConversation
);
router.post("/messages/:id", verifyJWT, messageController.sendMessage);

/* Favourites --------------------------------------------------------------*/
router.get("/favourites", verifyJWT, favouriteController.getAll);
router.post("/favourites/:advertId", verifyJWT, favouriteController.add);
router.delete("/favourites/:advertId", verifyJWT, favouriteController.remove);

/*Likes
-------------------------------------------------------------*/
router.post("/likes/:postId", verifyJWT, likeController.add);
router.delete("/likes/:postId", verifyJWT, likeController.remove);

module.exports = router;
