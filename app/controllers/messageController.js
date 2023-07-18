const { Message } = require("../models/index");

const messageController = {
  getUserMessage: async (_, res) => {
    try {
      const message = await Message.findAll({
        order: [["created_at", "DESC"]],
      });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

//GET	/messages/:id	L’id de la conversation	Afficher tous les messages de la conversation
//POST	/messages/:id	L’id de la conversation	Envoyer un message dans la conversation
};

module.exports = messageController;
