const { Message } = require("../models/index");
const { Op } = require("sequelize");

// GET | /messages |  | Afficher tous les messages de l’utilisateur |
const messageController = {
  getUserMessage: async (_, res) => {
    try {
      const userId=1;

      const message = await Message.findAll({
        where: {
          [Op.or]: [
            { destinataire: userId },
            {expediteur: userId }
          ]
        },
        order: [["created_at", "DESC"]],
      });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  //GET	/messages/:id	L’id de la conversation	Afficher tous les messages de la conversation
  displayAllConversation : async (req, res) => {
    try{
      const conversationId = req.params.id;

      const messages = await Message.findAll({
        where: {
          conversation_id: conversationId
        },
        order: [["created_at", "DESC"]]
      });

      res.status(200).json(messages);}
    catch (error) {
      res.status(500).json(error.toString());
    }
  },

  //POST	/messages/:id	L’id de la conversation	Envoyer un message dans la conversation
  sendMessage :async (req, res) => {
    try {
      const conversationId = req.params.id;
      const {content,expediteur,destinataire} = req.body;

      const message = await Message.create({
        content:content,
        expediteur:expediteur,
        destinataire:destinataire,
        conversation_id:conversationId
      });

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  }
};


module.exports = messageController;
