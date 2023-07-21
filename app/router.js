const { Router } = require("express");
const sanitizeMiddleware = require("./middlewares/sanitizeMiddleware");
const verifyAuthMiddleware = require("./middlewares/verifyAuthMiddleware");
const multer = require("./middlewares/multerMiddleware");
const {authController,postController,userController,advertController,messageController,favouriteController,likeController,} = require("./controllers/index");

const router = Router();

router.use(verifyAuthMiddleware);

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

/* -------------------------------Login/Signup ----------------------------------*/
router.post("/login", authController.login);
router.post("/signup", authController.signup);

/* --------------------------------Posts --------------------------------------*/
router.get("/posts", postController.getAll);
router.post("/posts", sanitizeMiddleware("content"), multer, postController.createPost);
router.patch("/posts/:id", sanitizeMiddleware("content"), multer, postController.update);
router.delete("/posts/:id", postController.remove);

/* -------------------------------Users -------------------------------------*/
router.get("/users/profile/:id", userController.getOne); //TODO route pour mon profil?
router.patch("/users/my-profile/edit", sanitizeMiddleware("description"), multer, userController.update);
router.delete("/users/my-profile/delete", userController.deleteUser);

/*  --------------------------Adverts -------------------------------------*/
router.get("/adverts", advertController.getAll);
router.get("/adverts/:id", advertController.getOne);
router.post("/adverts", sanitizeMiddleware("content"), multer, advertController.create);
router.patch("/adverts/:id", sanitizeMiddleware("content"), multer, advertController.update);
router.delete("/adverts/:id", advertController.remove);

/*-------------------------- Messages------------------------------------*/                  

router.get("/messages", messageController.getMessages);
router.get("/messages/:id", messageController.displayAllConversation);
router.post("/messages/:id", messageController.sendMessage);


/*-------------------------Favourites-------------------------------------*/
router.get("/favourites", favouriteController.getAll);
router.post("/favourites/:advertId", favouriteController.add);
router.delete("/favourites/:advertId", favouriteController.remove);

/* 
/*--------------------------Likes-------------------------*/
router.post("/likes/:postId", likeController.add);
router.delete("/likes/:postId", likeController.remove);

app.use("/", router);

module.exports = router;
