const { Favourite, Advert } = require("../models/index");

const favouriteController = {
  getAll: async (req, res) => {
    try {
      const { user } = req;

      const favourites = await user.getFavourites({
        include: [
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
      res.status(500).json(error.toString());
    }
  },
  add: async (req, res) => {
    try {
      const { user } = req;
      const advertId = req.params.advertId;

      const advert = await Advert.findByPk(advertId)

      if(!advert) {
        return res.status(404).json({error: "Cannot find this advert."})
      }
      user.addFavourites(advert)

      res.status(201).json({ message: "Added to favourites", advert: advert});
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
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

      res.json({message: "Removed from favourites"});
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = favouriteController;
