const { User } = require("../models/index");
const { v4: uuidv4 } = require("uuid");

const userController = {
  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const profile = await User.findByPk(id, {
        include: [
          "liked",
          "posts",
          {
            association: "adverts",
            include: [
              "images",
              {
                association: "advert_creator",
                attributes: {
                  exclude: [
                    "email",
                    "password",
                    "adress",
                    "longitude",
                    "latitude",
                    "created_at",
                    "updated_at",
                  ],
                },
              },
            ],
          },
        ],
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
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  update: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        description,
        address,
        city,
        longitude,
        latitude,
        email,
        password,
      } = req.body;
      const { user } = req;

      if (!user) {
        res.status(404).json("Page Introuvable !");
      }

      //! TODO: voir pour factoriser
      if (firstname) {
        user.firstname = firstname;
        user.slug = `${firstname.toLowerCase()}-${user.lastname.toLowerCase()}-${uuidv4()}`;
      }
      if (lastname) {
        user.lastname = lastname;
        user.slug = `${user.firstname.toLowerCase()}-${lastname.toLowerCase()}-${uuidv4()}`;
      }
      if (description) {
        user.description = description;
      }
      if (req.file) {
        user.thumbnail = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      if (address) {
        user.address = address;
      }
      if (city) {
        user.city = city;
      }
      if (longitude) {
        user.longitude = longitude;
      }
      if (latitude) {
        user.latitude = latitude;
      }
      if (email) {
        //! NOUVEAU
        const existingEmail = await User.findOne({
          where: {
            email: email,
          },
        });

        if (existingEmail) {
          res
            .status(400)
            .json({ error: "Cet email est déjà associé à un compte" });
          return;
        }

        user.email = email;
      }
      if (password) {
        user.password = password;
      }

      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  deleteUser: async (req, res) => {
    //! TODO : ajouter une sécurité (demander le mot de passe par exemple) avant de supprimer
    try {
      const { user } = req;
      if (user) {
        await user.destroy();
        res.json({
          message:
            "L'utilisateur a été supprimé de la base de données avec succès",
        });
      } else {
        res.status(404).json({ error: "Page introuvable" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },
};

module.exports = userController;
