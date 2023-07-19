const { Favourite, Advert, User } = require("../models/index");

const favouriteController = {
  getAllFavourites: async (req, res) => {
    try {
      const userId = req.params.id;
      //! voir pour déchiffrer l'id dans le token et le transmettre à la place de userId
      //const userID = req.user.id;

      const user = await User.findByPk(userId);
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
        order: [["created_at", "DESC"]]

      });

      res.status(200).json(favourites);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
  addToFavourites: async (req, res) => {
    try {
      //const userID = req.user.id;
      const userId = req.params.userId;
      const advertId = req.params.advertId;
      console.log(userId, advertId);

      const favourite = await Favourite.create({
        user_id: userId,
        advert_id: advertId,
      });


      res.status(201).json(favourite);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  removeFromFavourites: async (req, res) => {
    try {
      const userId = req.params.userId;
      const advertId = req.params.advertId;

      const favourite = await Favourite.destroy({
        where: {
          user_id: userId,
          advert_id: advertId,
        },
      });

      res.status(200).json(favourite);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = favouriteController;
