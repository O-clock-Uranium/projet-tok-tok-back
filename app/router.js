const { Router } = require("express");
const sanitizeMiddleware = require("./middlewares/sanitizeMiddleware");
const verifyAuthMiddleware = require("./middlewares/verifyAuthMiddleware");
const multer = require("./middlewares/multerMiddleware");
const {authController,postController,userController,advertController,messageController,favouriteController,likeController,} = require("./controllers/index");

const router = Router();

//TODO: Routes de l'API : router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.

// router.post("*", sanitize);
// router.patch("*", sanitize);
/**
 * ! Not a good practice
 * Toutes les requêtes passent par ce middleware qui sanitize toutes les données même si elles ne sont pas sensibles.
 * On peut donc le mettre sur les routes qui en ont besoin.
 * Exemple: POST /posts
 * sanitizeMiddleware
 */


/* login/signup -----------------------------------------------------------------*/
router.post("/login", authController.login);
router.post("/signup", authController.signup);

/* Posts -----------------------------------------------------------------*/
router.get("/posts", verifyAuthMiddleware, postController.getAll);
router.get("/post/:id", verifyAuthMiddleware, postController.getOne); //!!! A faire vérifier par la patronne
router.post(
  "/posts",
  verifyAuthMiddleware,
  sanitizeMiddleware("content"),
  multer.single("thumbnail"),
  postController.createPost
);
router.patch(
  "/posts/:id",
  verifyAuthMiddleware,
  sanitizeMiddleware("content"),
  multer.single("thumbnail"),
  postController.update
);
router.delete("/posts/:id", verifyAuthMiddleware, postController.remove);

/* Users -----------------------------------------------------------------*/
router.get("/profile/:id", verifyAuthMiddleware, userController.getOne); //? route pour MON profil ?
router.patch(
  "/my-profile/edit",
  verifyAuthMiddleware,
  sanitizeMiddleware("description"),
  multer.single("thumbnail"),
  userController.update
); //-> pour la page "paramètres"
router.delete("/my-profile/delete", verifyAuthMiddleware, userController.deleteUser);

/* Adverts ---------------------------------------------------------------*/
router.get("/adverts", verifyAuthMiddleware, advertController.getAll);
router.get("/adverts/:id", verifyAuthMiddleware, advertController.getOne);
router.post(
  "/adverts",
  verifyAuthMiddleware,
  sanitizeMiddleware("content"),
  multer.array("thumbnails"),
  advertController.create
);
router.patch(
  "/adverts/:id",
  verifyAuthMiddleware,
  sanitizeMiddleware("content"),
  multer.array("thumbnails"),
  advertController.update
);
router.delete("/adverts/:id", verifyAuthMiddleware, advertController.remove);

/* Messages
--------------------------------------------------------------*/
router.get("/messages", verifyAuthMiddleware, messageController.getMessages);
router.get(
  "/messages/:id",
  verifyAuthMiddleware,
  messageController.displayAllConversation
);
router.post("/messages/:id", verifyAuthMiddleware, messageController.sendMessage);

/* Favourites --------------------------------------------------------------*/
router.get("/favourites", verifyAuthMiddleware, favouriteController.getAll);
router.post("/favourites/:advertId", verifyAuthMiddleware, favouriteController.add);
router.delete("/favourites/:advertId", verifyAuthMiddleware, favouriteController.remove);

/*Likes
-------------------------------------------------------------*/
router.post("/likes/:postId", verifyAuthMiddleware, likeController.add);
router.delete("/likes/:postId", verifyAuthMiddleware, likeController.remove);

module.exports = router;
