const { Like } = require("../models/index");

const likeController = {
  add: async (req, res) => {
    try {
      const { user } = req;
      const postId = req.params.postId;

      const favourite = await Like.create({
        user_id: user.id,
        post_id: postId,
      });

      res.status(201).json(favourite);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
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
        res.status(404).json({ error: "Cannot find this post." });
      }

      like.destroy();

      res.json(like);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = likeController;
