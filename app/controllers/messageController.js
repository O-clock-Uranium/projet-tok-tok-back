const { Message } = require("../models/index");
const { Op } = require("sequelize");

const messageController = {
  getConversations: async (req, res) => {
    try {
      const { user } = req;

      const message = await Message.findAll({
        where: {
          expediteur: user.id,
        },
        group: ["destinataire"],
        attributes: {
          exclude: ["content", "updated_at"],
        },
        order: [["created_at", "DESC"]],
      });
      res.json(message);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  getMessages: async (req, res) => {
    try {
      const { user } = req;

      const message = await Message.findAll({
        where: {
          [Op.or]: [{ destinataire: user.id }, { expediteur: user.id }],
        },
        order: [["created_at", "DESC"]],
      });
      res.json(message);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  displayAllConversation: async (req, res) => {
    try {
      const conversationId = req.params.id;

      const messages = await Message.findAll({
        where: {
          conversation_id: conversationId,
        },
        order: [["created_at", "DESC"]],
      });

      res.json(messages);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  sendMessage: async (req, res) => {
    try {
      const conversationId = req.params.id;
      const { content, expediteur, destinataire } = req.body;

      const message = await Message.create({
        content: content,
        expediteur: expediteur,
        destinataire: destinataire,
        conversation_id: conversationId,
      });

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
};

module.exports = messageController;
