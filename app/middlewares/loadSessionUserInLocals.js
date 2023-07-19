const { User } = require("../models");

const loadSessionUserInLocals = async (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    const user = await User.findByPk(userId, { attributes: { exclude: "password" }});
    req.user = user;
    res.locals.user = user;
  }

  next();
};

module.exports = loadSessionUserInLocals;
