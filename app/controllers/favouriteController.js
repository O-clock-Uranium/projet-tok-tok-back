const { Favourite } = require("../models/index");

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

      const favourite = await Favourite.create({
        user_id: user.id,
        advert_id: advertId,
      });

      res.status(201).json(favourite);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  remove: async (req, res) => {
    try {
      const { user } = req;
      const advertId = req.params.advertId;

      const favourite = await Favourite.destroy({
        where: {
          user_id: user.id,
          advert_id: advertId,
        },
      });

      res.json(favourite);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = favouriteController;
