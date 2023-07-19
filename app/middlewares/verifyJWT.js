// middleware à passer sur toutes les routes où il faut être authentifié

const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
    /**
     * Ici, on vérifie le token qui est envoyé en-tête des requêtes http.
     * Si j'ai bien compris, c'est ce qu'on envoie dans l'instance Axios côté front (bearer)
     */

    /**
     * const token = req.headers.authorization;
     * if (token) {
     *   -> Extraction du JWT du format "Bearer <token>"
     *   const jwtToken = token.split(' ')[1];
     *   -> puis verifiy etc }
     */


  // ou peut-être avec les session pour le moment mais comment on le récupère côté front ?

  if (req.session.token) {
    const token = req.session.token;

    jwt.verify(token, "thisIsASecretToPutInDotEnv", (err, decoded) => {
      if (err) {
        res.status(403).json({ auth: false, error: "Your token is not valid" });
      } else {
        // ça pas trop compris, ça m'a pas l'air utile pour nous
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(401).json({ auth: false, error: "You are not authorized to see this!" });
  }
};
