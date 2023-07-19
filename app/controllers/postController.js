const { Post } = require("../models/index");

const postController = {
  getAllPosts: async (_, res) => {
    try {
      const posts = await Post.findAll({
        order: [["created_at", "DESC"]],
        include: [
          {
            association: "post_creator",
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
          {
            association: "users_liked",
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
          "replies"
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createPost: async (req, res) => {
    try {
      const { content, thumbnail, reply_to, user_id } = req.body;

      const newPost = await Post.create({
        content,
        thumbnail,
        reply_to,
        user_id,
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create post" });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { content, thumbnail } = req.body;

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
  },

  //!Voir si on ne demande pas une confirmation de l'utilisateur avant la suppresion???
  deletePost: async (req, res) => {
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
  },
};

module.exports = postController;
