const { Tag } = require("../models");

const categoriesController = {
  getAll: async (req, res) => {
    try {
      const categories = await Tag.findAll({ attributes: ["id", "name"] });
      res.json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },
};

module.exports = categoriesController;
