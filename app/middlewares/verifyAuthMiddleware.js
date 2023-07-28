// const jwt = require("jsonwebtoken");

// // Fonction pour générer un jeton (token) JWT en utilisant l'objet (obj) passé en paramètre
// exports.makeToken = function (obj) {
//   return jwt.sign(obj, process.env.TOKEN_SECRET, { expiresIn: "3 days" });
// };

// // Middleware pour vérifier le jeton (token) JWT dans les requêtes HTTP
// exports.verify = function (req, res, next) {
//   // Vérifier si l'en-tête "Authorization" est présent dans la requête
//   if (!req.headers.authorization) {
//     return res.status(401).json({ errCode: 50, err: "no token provided" });
//   }

//   // Récupérer le jeton (token) de l'en-tête "Authorization"
//   const token = req.headers.authorization.split(" ")[1];

//   // Vérifier si le jeton (token) est présent
//   if (!token) {
//     return res.status(401).json({ errCode: 50, err: "no token provided" });
//   }

//   // Vérifier la validité du jeton (token) en le décodant avec la clé secrète (TOKEN_SECRET)
//   jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
//     if (err) {
//       return res.status(498).json({ errCode: 51, err: "bad token" });
//     } else {
//       // Si le jeton est valide, ajouter le contenu décodé du jeton à la requête (req)
//       req.userToken = decodedToken;
//       // Poursuivre le traitement de la requête en appelant la fonction "next"
//       next();
//     }
//   });
// };

// // Middleware pour vérifier le jeton (token) JWT dans les connexions WebSocket
// exports.socketverify = function (socket, next) {
//   // Récupérer le jeton (token) de l'authentification du handshake de la connexion WebSocket
//   const token = socket.handshake.auth.token;

//   // Vérifier si le jeton (token) est présent
//   if (!token) {
//     return next(new Error("Auth: no token provided"));
//   }

//   // Vérifier la validité du jeton (token) en le décodant avec la clé secrète (TOKEN_SECRET)
//   jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
//     if (err) {
//       return next(new Error("Auth: invalid token provided"));
//     } else {
//       // Si le jeton est valide, ajouter le contenu décodé du jeton à l'objet "socket.user"
//       socket.user = decodedToken;
//       // Poursuivre la connexion WebSocket en appelant la fonction "next"
//       next();
//     }
//   });
// };


const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyJWT = async (req, res, next) => {
  /**
   * Ici, on vérifie le token qui est envoyé en-tête des requêtes http.
   * Si j'ai bien compris, c'est ce qu'on envoie dans l'instance Axios côté front (bearer)
   */
  const token = req.headers.authorization;
  console.log(token);

  if (!token)
    res
      .status(401)
      .json({ auth: false, error: "You are not authorized to see this!" });

  const jwtToken = token.split(" ")[1]; /* -> Extraction du JWT du format "Bearer <token>" */

  jwt.verify(jwtToken, process.env.SECRETTOKEN, async (err, decoded) => {
    if (err)
      res.status(403).json({ auth: false, error: "Your token is not valid" });

    console.log(decoded);
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user)
      return res
        .status(403)
        .json({ auth: false, error: "Your token is not valid" });

    req.user = user;

    console.log(decoded);

    next();
  });
};

module.exports = verifyJWT;
