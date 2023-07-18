const { Post } = require("../models/index");

const postController = {

  // ajouter l'association "post_creator", "users_has_liked", "replies"
  getAllPosts: async (_, res) => {
    try {
    // ajouter l'association "post_creator", "users_has_liked", "replies"
      const posts = await Post.findAll({
        order: [["created_at", "DESC"]]
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }


  },
  //   createPost= async (res, res) =>{
  //     try {
  //       const {content , thumbnail} = req.body
  //     }
  //   }

};

//POST	/posts		Créer un nouveau post
async (req, res) => {
  try {
    const {content,thumbnail,reply_to,user_id} = req.body;

    const newPost = await Post.create({
      content,
      thumbnail,
      reply_to,
      user_id
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error:"Failed to create post" });
  }
};
//PATCH	/posts/:id	L’id du post à modifier	Modifier une publication
async (req, res) => {
  try {
    const {content,thumbnail} = req.body;

    //est ce que cela ne fait pas trop "moche" autant de if????
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    post.content = content;
    post.thumbnail = thumbnail;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update post" });
  }
};


//DELETE	/posts/:id	L’id du post à supprimer	Supprimer une publication


//Voir si on ne demande pas une confirmation de l'utilisateur avant la suppresion???

async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await post.destroy();
    return res.status(200).json(post);
  } catch (error) {

    return res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = postController ;
