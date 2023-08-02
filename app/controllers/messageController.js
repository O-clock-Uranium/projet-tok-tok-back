const Conversation = require("../models/Conversation");
const { Message } = require("../models/index");
const { Op } = require("sequelize");

const messageController = {
  getContacts: async (req, res) => {
    try {
      const { user } = req;

      const conversations = await Conversation.findAll({
        where: {
          [Op.or]: [{ user1: user.id }, { user2: user.id }],
        },
        include: [
          {
            association: "user_one_info",
            attributes: ["id", "firstname", "lastname", "thumbnail"],
          },
          {
            association: "user_two_info",
            attributes: ["id", "firstname", "lastname", "thumbnail"],
          },
        ],
      });

      const modifiedConversations = conversations.map((conversation) => {
        const conversationData = conversation.get({ plain: true });

        if (conversationData.user_one_info.id === user.id) {
          delete conversationData.user_one_info;
        }

        if (conversationData.user_two_info.id === user.id) {
          delete conversationData.user_two_info;
        }

        return conversationData;
      });

      console.log(modifiedConversations);

      res.json(modifiedConversations);
    } catch (error) {
      console.log(error);
    }
  },

  getMessages: async (req, res) => {
    try {
      const { user } = req;
      const { destId } = req.params;

      const conversation = await Conversation.findOne({
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ user1: user.id }, { user2: destId }],
            },
            {
              [Op.and]: [{ user1: destId }, { user2: user.id }],
            },
          ],
        },
      });

      if (!conversation) {
        return res.json({ message: "aucune conversation en cours" });
      }

      const messages = await conversation.getMessages({ limit: 50 });

      res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },

  // getMessages: async (req, res) => {
  //   try {
  //     const { user } = req;
  //     const { destId } = req.params;

  //     const message = await Message.findAll({
  //       where: {
  //         destinataire: {
  //           [Op.or]: [user.id, destId],
  //         },
  //         expediteur: {
  //           [Op.or]: [user.id, destId],
  //         },
  //       },
  //       attributes: {
  //         exclude: ["conversation_id"],
  //       },
  //       order: [["created_at", "DESC"]],
  //       limit: 50,
  //     });
  //     res.json(message);
  //   } catch (error) {
  //     res.status(500).json({ error: "Erreur Serveur !" });
  //   }
  // },

  sendMessage: async (req, res) => {
    try {
      // const roomId = req.params.id;
      const { user } = req;
      const { content, destinataire } = req.body;

      const conv = await Conversation.findOne({
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ user1: user.id }, { user2: destinataire }],
            },
            {
              [Op.and]: [{ user1: destinataire }, { user2: user.id }],
            },
          ],
        },
      });

      let newConv = null;

      if (conv == null) {
        console.log("coucou");
        newConv = await Conversation.create({
          user1: user.id,
          user2: destinataire,
        });
      }

      const message = Message.build({
        content: content,
        sender: user.id,
      });

      conv
        ? (message.conversation_id = conv.id)
        : (message.conversation_id = newConv.id);

      await message.save();

      res.status(201).json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur Serveur !" });
    }
  },
};

module.exports = messageController;
