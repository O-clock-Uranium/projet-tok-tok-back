const dataMapper = require("../dataMapper.js");

const mainController = {
  homepage: async (_, res) => {
    const data = await dataMapper.findALLUser();
    res.render("Homepage_Membre", { users: data });
  },

  tag : async (_, res) => {
    const data = await dataMapper.getAllAdvertWithTag();
    res.render("Annonce", { adverts: data });
  }
};

module.exports = mainController;
