const { Router } = require("express");
const sanitize = require("./middlewares/sanitize");
const verifyAuthMiddleware = require("./middlewares/verifyAuthMiddleware");
const multer = require("./middlewares/multerMiddleware");
const {
  advertController,
  authController,
  categoriesController,
  favouriteController,
  likeController,
  messageController,
  postController,
  userController,
} = require("./controllers/index");

const router = Router();

//TODO: Routes de l'API : router.get('/'); -> une page de 'doc' listant toutes nos routes. On renderera un fichier html.

router.post("*", sanitize);
router.patch("*", sanitize);

/* Login/Signup -----------------------------------------------------------------*/
router.post("/login", authController.login);
router.post("/signup", authController.signup);

/* Posts -----------------------------------------------------------------*/
router.get("/posts", verifyAuthMiddleware, postController.getAll);
router.get("/post/:id", verifyAuthMiddleware, postController.getOne); 
router.post(
  "/posts",
  verifyAuthMiddleware,
  multer.single("thumbnail"),
  postController.createPost
);
router.patch(
  "/posts/:id",
  verifyAuthMiddleware,
  multer.single("thumbnail"),
  postController.update
);
router.delete("/posts/:id", verifyAuthMiddleware, postController.remove);

/* Users -----------------------------------------------------------------*/
router.get("/profile/:slug", verifyAuthMiddleware, userController.getOne); //? route pour MON profil ?
router.patch(
  "/my-profile/edit",
  verifyAuthMiddleware,
  multer.single("thumbnail"),
  // multer.single("banner"), // A garder masqué tant qu'on a pas l'input banner
  userController.update
);
router.patch(
  "/my-profile/edit-banner",
  verifyAuthMiddleware,
  multer.single("banner"),
  userController.changeBanner
);
router.delete(
  "/my-profile/delete",
  verifyAuthMiddleware,
  userController.deleteUser
);

/* Adverts ---------------------------------------------------------------*/
router.get("/adverts", verifyAuthMiddleware, advertController.getAll);
router.get("/profile/:id/adverts", verifyAuthMiddleware, advertController.getAllFromUser);

router.get("/adverts/:slug", verifyAuthMiddleware, advertController.getOne);
router.post(
  "/adverts",
  verifyAuthMiddleware,
  multer.array("thumbnails"),
  advertController.create
);
router.patch(
  "/adverts/:id",
  verifyAuthMiddleware,
  multer.array("thumbnails"),
  advertController.update
);
router.delete("/adverts/:id", verifyAuthMiddleware, advertController.remove);

/* Messages
--------------------------------------------------------------*/
// router.get("/messages", verifyAuthMiddleware, messageController.getMessages);
// router.get(
//   "/messages/:id",
//   verifyAuthMiddleware,
//   messageController.displayAllConversation
// );
// router.post(
//   "/messages/:id",
//   verifyAuthMiddleware,
//   messageController.sendMessage
// );

router.get("/contacts", verifyAuthMiddleware, messageController.getContacts); //* OK
router.get("/messages/:destId", verifyAuthMiddleware, messageController.getMessages); // mettre une limite 50
router.post("/messages", verifyAuthMiddleware, messageController.sendMessage); // envoyer un message avec dans le formdata roomId en facultatif

//router.patch("/message/:id", verifyAuthMiddleware); // corriger un message
// router.delete("/message/:id", verifyAuthMiddleware); // supprimer un message


/* Favourites --------------------------------------------------------------*/
router.get("/favourites", verifyAuthMiddleware, favouriteController.getAll);
router.post(
  "/favourites/:advertId",
  verifyAuthMiddleware,
  favouriteController.add
);
router.delete(
  "/favourites/:advertId",
  verifyAuthMiddleware,
  favouriteController.remove
);

/*Likes
-------------------------------------------------------------*/
router.post("/likes/:postId", verifyAuthMiddleware, likeController.add);
router.delete("/likes/:postId", verifyAuthMiddleware, likeController.remove);

/* Categories -----------------------------------------------*/
router.get("/categories", verifyAuthMiddleware, categoriesController.getAll);

module.exports = router;
