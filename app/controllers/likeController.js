const { Like } = require("../models/index");

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
