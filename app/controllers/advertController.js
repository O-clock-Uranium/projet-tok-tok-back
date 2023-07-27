const { Advert, Advert_has_image } = require("../models/index");
const radius_calc = require("../../public/radius_calc");
const { Op } = require("sequelize");

const advertsController = {
  getAll: async (req, res) => {
    try {
      const radius = radius_calc(req.user.latitude, req.user.longitude);

      const adverts = await Advert.findAll({
        include: [
          "images",
          {
            association: "advert_creator",
            // where: {
            //   longitude: {
            //     [Op.between]: [radius.longitude.min, radius.longitude.max],
            //   },
            //   latitude: {
            //     [Op.between]: [radius.latitude.min, radius.latitude.max],
            //   },
            // },
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
      res.status(500).json({ error: "Erreur Serveur !" });
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
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  create: async (req, res) => {
    try {
      const { title, content, price, tag_id } = req.body;
      const { user } = req;
      console.log(req.files);
      const images = req.files;

      const slug = `${title.split(" ").join("-")}-${Date.now()}`;

      const newAdvert = Advert.build({
        title,
        content,
        price,
        user_id: user.id,
        tag_id,
        slug: slug,
      });

      await newAdvert.save();

      images.forEach(async (e, index) => {
        const image = Advert_has_image.build({
          advert_id: newAdvert.id,
          thumbnail: `${req.protocol}://${req.get("host")}/images/${
            req.files[index].filename
          }`,
        });

        await image.save();
      });

      res.status(201).json(newAdvert);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erreur Serveur !" });
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
          .json({ error: "Vous n'êtes pas autorisé à faire ceci" });
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
      return res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  remove: async (req, res) => {
    //TODO: ici il faudra rajouter une boite de dialogue pour confirmer la suppression
    try {
      const { id } = req.params;

      const advert = await Advert.findByPk(id);

      if (!advert) {
        res.status(404).json({ error: "Page introuvable" });
      }

      const { user } = req;
      if (user.id !== advert.user_id) {
        return res
          .status(401)
          .json({ error: "Vous n'êtes pas autorisé à faire ceci !" });
      }

      advert.destroy();
      res.json({ message: "Annonce supprimée !" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erreur Serveur !" });
    }
  },
};

module.exports = advertsController;
