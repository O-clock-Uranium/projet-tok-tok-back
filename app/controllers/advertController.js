const { Advert, Advert_has_image } = require("../models/index");

const advertsController = {
  //* ce sera les résultats à afficher quand on clique sur "annonces" dans le menu fixed.
  //* nb: pour le moment, on affiche touuuuutes les annonces mais par la suite on filtrera celles qui se trouvent dans tel rayon autour du user loggué
  getAll: async (_, res) => {
    try {
      const adverts = await Advert.findAll({
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
      res.json(adverts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString("Erreur Serveur!!"));
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const advert = await Advert.findByPk(id, {
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
      });

      if (!advert) {
        res.status(404).json({ error: "Annonce introuvable" });
      }

      res.json(advert);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString("Erreur Serveur!!"));
    }
  },

  create: async (req, res) => {
    try {
      const { title, content, price, tag_id } = req.body;
      const { user } = req;
      console.log(req.files);
      const images = req.files;

      const newAdvert = Advert.build({
        title,
        content,
        price,
        user_id: user.id,
        tag_id,
      });

      await newAdvert.save();

      images.forEach(async (e, index) => {
        const image = Advert_has_image.build({
          advert_id: newAdvert.id,
          thumbnail: `${req.protocol}://${req.get("host")}/images/${req.files[index].filename}`,
        });


        await image.save();
      });

      res.status(201).json(newAdvert);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erreur Serveur!!" });
    }
  },

  update: async (req, res) => {
    try {
      const { title, content, price, tag_id } = req.body;
      const images = req.files;

      const advert = await Advert.findByPk(req.params.id);

      if (!advert) {
        return res.status(404).json({ error: "Annonce introuvable" });
      }

      const { user } = req;
      if (user.id !== advert.user_id) {
        return res
          .status(401)
          .json({ error: "Vous n'êtes pas autorisé à voir ceci" });
      }
      title ? (advert.title = title) : false;
      content ? (advert.content = content) : false;
      price ? (advert.price = price) : false;
      tag_id ? (advert.tag_id = tag_id) : false;

      advert.save();

      images.forEach(async (e, index) => {
        const image = Advert_has_image.build({
          advert_id: advert.id,
          thumbnail: `${req.protocol}://${req.get("host")}/images/${
            req.files[index].filename
          }`,
        });

        await image.save();
      });

      res.json(advert);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erreur Serveur!!" });
    }
  },

  remove: async (req, res) => {
    //TODO: ici il faudra rajouter une boite de dialogue pour confirmer la suppression
    try {
      const { id } = req.params;

      const advert = await Advert.findByPk(id);

      if (!advert) {
        res.status(404).json({ error: "Cannot find this advert" });
      }

      const { user } = req;
      if (user.id !== advert.user_id) {
        return res
          .status(401)
          .json({ error: "You are not allowed to do this." });
      }

      advert.destroy();
      res.json({message: "Advert deleted"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erreur Serveur!!" });
    }
  },
};

module.exports = advertsController;
