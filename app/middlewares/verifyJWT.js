// middleware à passer sur toutes les routes où il faut être authentifié
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.verifyJWT = async (req, res, next) => {
  /**
   * Ici, on vérifie le token qui est envoyé en-tête des requêtes http.
   * Si j'ai bien compris, c'est ce qu'on envoie dans l'instance Axios côté front (bearer)
   */
  const token = req.headers.authorization;
  if (!token)
    res
      .status(401)
      .json({ auth: false, error: "You are not authorized to see this!" });

  // -> Extraction du JWT du format "Bearer <token>"
  const jwtToken = token.split(" ")[1];
  jwt.verify(jwtToken, process.env.SECRETTOKEN, async (err, decoded) => {
    if (err)
      res.status(403).json({ auth: false, error: "Your token is not valid" });

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user)
      return res
        .status(403)
        .json({ auth: false, error: "Your token is not valid" });

    req.user = user;

    console.log(decoded);

    next();
  });
};
