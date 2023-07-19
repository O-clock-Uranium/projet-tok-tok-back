const { associations } = require("../models/Message");
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
            attributes: {exclude: ["email", "password", "description", "localization", "created_at", "updated_at"]} 
          }],
        order: [["created_at", "DESC"]],
      });
      res.status(200).json(adverts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  //GET	/annonces/:id	L’id de l’annonce cliquée	Afficher les informations de l’annonce cliquée et ses photos
  getOne: async (req, res) => {
    try {
        const {id} = req.params;
        const advert = await Advert.findByPk(id, {
          include: [
            "images", 
            {
              association: "advert_creator",
              attributes: {exclude: ["email", "password", "description", "localization", "created_at", "updated_at"]} 
            }]
        });

        if(!advert) {
            res.status(404).json({error: "Can't find this advert"});
        }

        res.status(200).json(advert);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.toString());
    }
  },

  //POST	/annonces		Créer une nouvelle annonce
  createAdvert: async (req, res) => {
    try {
      const { title, content, price, user_id, tag_id } = req.body;

      const newAdvert = Advert.build({
        title,
        content,
        price,
        user_id,
        tag_id,
      });

      await newAdvert.save();
      res.status(201).json(newAdvert);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create advert" });
    }
  },

  //PATCH	/annonces/:id	L’id de l’annonce cliquée	Modifier l’annonce cliquée et ses photos
  updateAdvert: async (req, res) => {
    try {
      // on pourra modifier tous les champs sauf le user_id
      //? est-ce qu'on laisse la possibilité de modifier les images ? nb: les images sont dans la tables "advert_has_image"
      const { title, content, price, tag_id } = req.body;

      const advert = await Advert.findByPk(req.params.id);

      if (!advert) {
        return res.status(404).json({ error: "Post not found" });
      }

      advert.title = title;
      advert.content = content;
      advert.price = price;
      advert.tag_id = tag_id;

      advert.save();

      res.status(200).json(advert)

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to update advert" });
    }
  },
  
  //DELETE	/annonces/:id	L’id de l’annonce cliquée	Supprimer l’annonce cliquée et ses photos
  deleteAdvert: async (req, res) => {
    try {
        const {id} = req.params;

        const advert = await Advert.findByPk(id);

        if(!advert) {
            res.status(404).json({ error: "Cannot find this advert" })
        }
        //TODO: ici il faudra rajouter une boite de dialogue pour confirmer la suppression 

        advert.destroy()
        
        res.status(200).json(advert)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to update advert" });
    }
  }
};
//GET 	/annonces?distance=distance	distance : La distance sélectionnée dans les filtres de recherche	Afficher les annonces dans le rayon sélectionné
//GET 	/annonces?orderby=date	distance : La distance sélectionnée dans les filtres de recherche	Afficher les annonces dans le rayon sélectionné


module.exports = advertsController;
