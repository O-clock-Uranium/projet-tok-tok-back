const multer = require("multer");

// Bibliothèque des types de fichiers qu'un utilisateur peut nous envoyer
// Pour les images
const IMAGE_MIME_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Pour les vidéos
const VIDEO_MIME_TYPES = {
  "video/mp4": "mp4",
  "video/quicktime": "mov",
};

const storage = multer.diskStorage({
  destination: (_, file, callback) => {
    if (IMAGE_MIME_TYPES[file.mimetype]) {
      callback(null, "public/images"); // Destination pour les images
    } else if (VIDEO_MIME_TYPES[file.mimetype]) {
      callback(null, "public/videos"); // Destination pour les vidéos
    } else {
      callback(new Error("Format de fichier invalide"));
    }
  },
  filename: (_, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extension =
      IMAGE_MIME_TYPES[file.mimetype] || VIDEO_MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
    //? on pourrait aussi mettre un UUID pour éviter les noms de fichier bizarres
  },
});

// Dans l'exports, le premier storage est pour définir les settings et l'autre pour configurer l'instance du middleware multer.
module.exports = multer({ storage: storage })
//* Sur la route : multer +
//* .single("thumbnail") quand on reçoit un fichier -> retourne obj 
//* .array() quand on reçoit plusieurs fichiers -> retourne tableau d'obj
