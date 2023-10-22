// middleware à passer sur toutes les routes où il faut être authentifié

const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyJWT = async (req, res, next) => {

  // On récupère le token transmi en header de la requête HTTP
  const token = req.headers.authorization;

  // S'il n'y a pas de token, on renvoie une erreur
  if (!token)
    return res
      .status(401)
      .json({ auth: false, error: "You are not authorized to see this!" });

  const jwtToken = token.split(" ")[1]; /* -> Extraction du JWT du format "Bearer <token>" */

  // On vérifie si le token envoyé est valide
  // La méthode verify décode le token grâce au secret du .env
  jwt.verify(jwtToken, process.env.SECRETTOKEN, async (err, decoded) => {
    if (err)
      return res.status(403).json({ auth: false, error: "Your token is not valid" });

    // On s'assure que l'id décodé dans le token correspond bien à un membre
    const user = await User.findOne({ where: { id: decoded.userId } });

    // S'il n'y en a pas, on renvoie une erreur
    if (!user)
      return res
        .status(403)
        .json({ auth: false, error: "Your token is not valid" });

    // On stocke les informations de l'utilisateur identifié dans req
    req.user = user;

    // On passe au middleware/controller suivant
    next();
  });
};

module.exports = verifyJWT;
