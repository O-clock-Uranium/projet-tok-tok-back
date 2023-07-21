// middleware à passer sur toutes les routes où il faut être authentifié
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
