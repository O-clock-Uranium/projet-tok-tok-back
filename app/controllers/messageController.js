const { Message } = require("../models/index");
const { Op } = require("sequelize");

const messageController = {
  getContacts: async (req, res) => {
    try {
      const { user } = req;

      // const message = await Message.findAll({
      //   where: {
      //     [Op.or]: [{ expediteur: user.id }, { destinataire: user.id }],
      //   },
      //   include: ["info_destinataire", "info_expediteur"]
      // });

      const contactExp = await 

      res.json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { user } = req;
      const { destId } = req.params;

      const message = await Message.findAll({
        where: {
          destinataire: {
            [Op.or]: [user.id, destId],
          },
          expediteur: {
            [Op.or]: [user.id, destId],
          },
        },
        attributes: {
          exclude: ["conversation_id"],
        },
        order: [["created_at", "DESC"]],
        limit: 50,
      });
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      //const roomId = req.params.id;
      const { user } = req;
      const { content, destinataire } = req.body;

      const conversation = await Message.findOne({
        where: {
          destinataire: {
            [Op.or]: [user.id, destinataire],
          },
          expediteur: {
            [Op.or]: [user.id, destinataire],
          },
        },
      });

      const message = Message.build({
        content: content,
        expediteur: req.user.id,
        destinataire: destinataire,
      });

      conversation
        ? (message.conversation_id = conversation.conversation_id)
        : (message.conversation_id = 123);

      await message.save();

      res.status(201).json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },
};

module.exports = messageController;
