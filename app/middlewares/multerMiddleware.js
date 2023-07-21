const multer = require('multer');

// Bibliothèque des types de fichiers qu'un utilisateur peut nous envoyer
// Pour les images
const IMAGE_MIME_TYPES = {
  'image/jpg': 'jpg', 
  'image/png': 'png',
};

// Pour les vidéos
const VIDEO_MIME_TYPES = {
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
};

const storage = multer.diskStorage({
  destination: (_, file, callback) => {
    if (IMAGE_MIME_TYPES[file.mimetype]) {
      callback(null, 'images'); // Destination pour les images
    } else if (VIDEO_MIME_TYPES[file.mimetype]) {
      callback(null, 'videos'); // Destination pour les vidéos
    } else {
      callback(new Error('Format de fichier invalide'));
    }
  },
  filename: (_, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Remplacement potentiel d'espaces par des underscores
    const extension = IMAGE_MIME_TYPES[file.mimetype] || VIDEO_MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); // Nom du fichier stocké + timestamp pour éviter le risque de doublon
  },
});

// Dans l'exports, le premier storage est pour définir les settings et l'autre pour configurer l'instance du middleware multer.
module.exports = multer({ storage: storage }).single('file'); // single pour dire que c'est un fichier unique et peu importe image ou vidéo
