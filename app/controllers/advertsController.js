const { Advert } = require("../models/index");

const advertsController = {
  getAllAdverts: async (_, res) => {
    try {
      const adverts = await Advert.findAll({
        order: [["created_at", "DESC"]],
      });
      res.status(200).json(adverts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  //POST	/annonces		Créer une nouvelle annonce

createdAdvert: async (req, res) => {
   try {
    const {title,content,}
   }
}

  },



  //GET	/annonces/:id	L’id de l’annonce cliquée	Afficher les informations de l’annonce cliquée et ses photos

  //PATCH	/annonces/:id	L’id de l’annonce cliquée	Modifier l’annonce cliquée et ses photos

  //DELETE	/annonces/:id	L’id de l’annonce cliquée	Supprimer l’annonce cliquée et ses photos

  //GET 	/annonces?category=category	category : La catégorie sélectionnée dans les filtres de recherche	Afficher les annonces dans notre rayon dont la catégorie est category

  //GET 	/annonces?distance=distance	distance : La distance sélectionnée dans les filtres de recherche	Afficher les annonces dans le rayon sélectionné

  //GET 	/annonces?orderby=date	distance : La distance sélectionnée dans les filtres de recherche	Afficher les annonces dans le rayon sélectionné
};

module.exports = advertsController;
