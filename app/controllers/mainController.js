const dataMapper = require("../dataMapper.js");

const mainController = {
  homepage: async (_, res) => {
    const data = await dataMapper.findALLUser();
    console.log(data);
    res.render("Homepage_Membre", { users: data });
  },

  tag : async (_, res) => {
    const data = await dataMapper.getAllAdvertWithTag();
    console.log(data);
    res.render("Annonce", { adverts: data });
  }
};

module.exports = mainController;
