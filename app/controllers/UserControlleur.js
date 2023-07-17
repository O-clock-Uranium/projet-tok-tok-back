const { User } = require("../models/index");

const userController = {
  getOneUser: async (_, res) => {
    try {
      const posts = await User.findAll({
        include: {
          association: "liked",
          // order: [["posts", "created_at", "DESC"]],

        },
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  //PATCH	/profil/:id	L’identifiant du profil	Modifier les informations d’un profil

  //DELETE	/profil/:id	L’identifiant du profil	Supprimer un profil
};

module.exports = userController;
