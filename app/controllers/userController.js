const { User } = require("../models/index");

const userController = {
  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const profile = await User.findByPk(id, {
        include: ["liked", "posts", "adverts"],
        attributes: {
          exclude: ["address", "password", "email", "updated_at"],
        },
        order: [
          ["posts", "created_at", "DESC"],
          ["liked", "created_at", "DESC"],
        ],
      });
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createOne: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        thumbnail,
        address,
        localization,
        email,
        password,
      } = req.body;

      // eslint-disable-next-line prefer-const
      let newUser = User.build({
        firstname,
        lastname,
        thumbnail,
        address,
        localization,
        email,
        password,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },
  update: async (req, res) => {
    try {
      const { firstname, lastname, thumbnail, address, email, password } =
        req.body;
      const { id } = req.params;
      console.log(id);

      const user = await User.findByPk(id);

      //! TODO: voir pour factoriser
      if (!user) {
        res.status(404).json("User not found");
      }
      if (firstname) {
        user.firstname = firstname;
      }
      if (lastname) {
        user.lastname = lastname;
      }
      if (thumbnail) {
        user.thumbnail = thumbnail;
      }
      if (address) {
        user.address = address;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }

      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  deleteUser: async (req, res) => {
    //! TODO : ajouter une sécurité (demander le mot de passe par exemple) avant de supprimer
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (user) {
        await user.destroy();
        res.json("User deleted from database successfully");
      } else {
        res.status(404).json("Can't find user with id " + id);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = userController;
