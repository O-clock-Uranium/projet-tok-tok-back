const { Post } = require("../models/index");

const postController = {
  getAll: async (_, res) => {
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
          "replies",
        ],
      });
      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createPost: async (req, res) => {
    try {
      const { content, reply_to } = req.body;
      console.log(req.file);

      const newPost = await Post.create({
        content,
        thumbnail : req.file.filename,
        reply_to,
        user_id: req.user.id,
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create post" });
    }
  },

  update: async (req, res) => {
    try {
      const { content, thumbnail } = req.body;

      console.log("coucou");

      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const { user } = req;
      if (user.id !== post.user_id) {
        return res
          .status(401)
          .json({ error: "You are not allowed to do this." });
      }

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      post.content = content;
      post.thumbnail = thumbnail;

      await post.save();

      return res.json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update post" });
    }
  },

  //! En front -> popup de confirmation
  remove: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const { user } = req;
      if (user.id !== post.user_id) {
        return res
          .status(401)
          .json({ error: "You are not allowed to do this." });
      }

      await post.destroy();
      return res.json({ message: "Post deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete post" });
    }
  },
};

module.exports = postController;
