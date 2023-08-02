// middleware à passer sur toutes les routes où il faut être authentifié
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyJWT = async (req, res, next) => {

  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .json({ auth: false, error: "You are not authorized to see this!" });

  const jwtToken = token.split(" ")[1]; /* -> Extraction du JWT du format "Bearer <token>" */

  jwt.verify(jwtToken, process.env.SECRETTOKEN, async (err, decoded) => {
    if (err)
      return res.status(403).json({ auth: false, error: "Your token is not valid" });

    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user)
      return res
        .status(403)
        .json({ auth: false, error: "Your token is not valid" });

    req.user = user;

    next();
  });
};

module.exports = verifyJWT;
