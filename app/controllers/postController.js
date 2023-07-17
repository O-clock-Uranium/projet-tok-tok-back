// const Post = require("../models/Post.js");
// const User = require("../models/user.js");
const { Post, User } = require("../models/associations");

const postController = {
  getAllPosts: async (_, res) => {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.toString())
    }
  },
  getAllUsers: async (_, res) => {
    try {
      const posts = await User.findAll({
        include: {
            association: "posts"
        }
      });
      res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.toString())
    }
  },
};

module.exports = postController;
