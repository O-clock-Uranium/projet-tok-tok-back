const { Post } = require("../models/index");

const postController = {
  getAllPosts: async (_, res) => {
    try {
      const posts = await Post.findAll({
        order: [["created_at", "DESC"]]
    });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  //POST	/posts		Créer un nouveau post

  //PATCH	/posts/:id	L’id du post à modifier	Modifier une publication

  //DELETE	/posts/:id	L’id du post à supprimer	Supprimer une publication
  
};

module.exports = postController;
