const { Favourite, Advert } = require("../models/index");

const favouriteController = {
  getAll: async (req, res) => {
    try {
      const { user } = req;

      const favourites = await user.getFavourites({
        include: [
          "tag",
          "images",
          {
            association: "advert_creator",
            attributes: {
              exclude: [
                "email",
                "password",
                "description",
                "localization",
                "created_at",
                "updated_at",
              ],
            },
          },
        ],
        order: [["created_at", "DESC"]],
      });

      res.json(favourites);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Erreur Serveur !"});
    }
  },
  add: async (req, res) => {
    try {
      const { user } = req;
      const advertId = req.params.advertId;

      const advert = await Advert.findByPk(advertId);

      if(!advert) {
        return res.status(404).json({error: "Page introuvable !"});
      }
      user.addFavourites(advert);

      res.status(201).json({ message: "Ajouté aux favoris !", advert: advert});
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Erreur Serveur !"});
    }
  },

  remove: async (req, res) => {
    try {
      const { user } = req;
      const advertId = req.params.advertId;

      Favourite.destroy({
        where: {
          user_id: user.id,
          advert_id: advertId,
        },
      });

      res.json({message: "Supprimé des favoris !"});
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Erreur Serveur !"});
    }
  },
};

module.exports = favouriteController;
