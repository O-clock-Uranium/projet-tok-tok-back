const { Like } = require("../models/index");
//POST	/favourites/:id/add	L’id de l’annonce à ajouter aux favoris	Ajouter une annonce aux favoris
const likeController = {
  addToLikes: async (req, res) => {
    try{
      //const userID = req.user.id;
      const userId = req.params.userId;
      const postId = req.params.postId;

      const favourite = await Like.create({
        user_id: userId,
        post_id:postId,
      });

      res.status(201).json(favourite);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  //DELETE	/favourites/:id/remove	L’id de l’annonce à ajouter aux favoris	Supprimer une annonce des favoris
  removeFromLikes: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;

      const like = await Like.findOne({
        where: {
          user_id: userId,
          post_id: postId
        }
      });

      if(!like) {
        res.status(404).json({error: 'Cannot find this post.'});
      }

      like.destroy();

      res.status(200).json(like);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};


module.exports = likeController;
