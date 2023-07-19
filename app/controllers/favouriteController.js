const { Favourite, Advert, User } = require("../models/index");

const favouriteController = {
  getAllFavourites: async (req, res) => {
    try {
      const userId = req.params.id;
      //const userID = req.user.id;


      // const favourites = await Favourite.findAll({
      //   where: { user_id: userId },
      //   // association: "favourite",
      //   include: Advert
      //   //   as: "users_favourite",
      //   //   // attributes: ["id", "title", "content", "price", "thumbnail"],
      //   // },
      // });

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

      //! trop de la balle aussi
      // const user = await User.findByPk(userId);
      // const advert = await Advert.findByPk(advertId);
      // const favourite = user.addFavourites(advert)

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

//GET	/favourites		Afficher les annonces favorites du user loggué
//POST	/favourites/:id/add	L’id de l’annonce à ajouter aux favoris	Ajouter une annonce aux favoris
//DELETE	/favourites/:id/remove	L’id de l’annonce à ajouter aux favoris	Supprimer une annonce des favoris

module.exports = favouriteController;
