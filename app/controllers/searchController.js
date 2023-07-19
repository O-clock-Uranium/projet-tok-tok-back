const { Op } = require("sequelize");
const { Post, User, Advert } = require("../models/index");

const searchController = {
  async search(req, res) {
    try {
      const searchTerm = req.query.q;
      //voir mettre un created_at
      const posts = await Post.findAll({
        where: {
          content: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      //?voir si on ajoute la recherche par pseudo également? à disctuter ensemble après discussion avec le patron
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { firstname: { [Op.like]: `%${searchTerm}%` } },
            { lastname: { [Op.like]: `%${searchTerm}%` } },
            { adresse: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      });

      const adverts = await Advert.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchTerm}%` } },
            { content: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      });

      res.render("searchResults", { posts, users, adverts });
    } catch (error) {
      console.error(error);
      res.render("searchResults", { error: "Une erreur s'est produite lors de la recherche." });
    }
  },
};

module.exports = searchController;
