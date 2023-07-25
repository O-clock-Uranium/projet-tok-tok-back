const { Like, Post } = require("../models/index");

const likeController = {
  add: async (req, res) => {
    try {
      const { user } = req;
      const postId = req.params.postId;

      const post = await Post.findByPk(postId);

      if(!post) {
        return res.status(404).json({error: "Page introuvable !"});
      }

      await Like.create({
        user_id: user.id,
        post_id: postId,
      });

      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  remove: async (req, res) => {
    try {
      const { user } = req;
      const postId = req.params.postId;

      const like = await Like.findOne({
        where: {
          user_id: user.id,
          post_id: postId,
        },
      });

      if (!like) {
        return res.status(404).json({ error: "Page introuvable !" });
      }

      if (user.id !== like.user_id) {
        return res
          .status(401)
          .json({ error: "Vous n'êtes pas autorisés à faire ceci !" });
      }

      like.destroy();

      res.json({message: "Like supprimé !"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },
};

module.exports = likeController;
