const { Advert } = require("../models/index");

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
      res.status(500).json(error.toString());
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
        res.status(404).json({ error: "Can't find this advert" });
      }

      res.json(advert);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  create: async (req, res) => {
    try {
      //TODO ajouter les images à upload
      const { title, content, price, tag_id } = req.body;
      const { user } = req;

      const newAdvert = Advert.build({
        title,
        content,
        price,
        user_id: user.id,
        tag_id,
      });

      await newAdvert.save();
      res.status(201).json(newAdvert);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create advert" });
    }
  },

  update: async (req, res) => {
    try {
      //? est-ce qu'on laisse la possibilité de modifier les images ? nb: les images sont dans la tables "advert_has_image"
      const { title, content, price, tag_id } = req.body;

      const advert = await Advert.findByPk(req.params.id);

      if (!advert) {
        return res.status(404).json({ error: "Advert not found" });
      }

      title ? (advert.title = title) : false;
      content ? (advert.content = content) : false;
      price ? (advert.price = price) : false;
      tag_id ? (advert.tag_id = tag_id) : false;

      advert.save();

      res.json(advert);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to update advert" });
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
      return res.status(500).json({ error: "Failed to update advert" });
    }
  },
};

module.exports = advertsController;
