const Conversation = require("../models/Conversation");
const { Message } = require("../models/index");
const { Op } = require("sequelize");

const messageController = {
  getContacts: async (req, res) => {
    try {
      const { user } = req;

      const contacts = await Conversation.findAll({
        where: {
          [Op.or]: [{ user1: user.id }, { user2: user.id }],
        },
        include: [
          { association: "user_one_info" },
          { association: "user_two_info" },
        ],
      });

      // ajouter un map +filter sur le resultat

      res.json(contacts);
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
      console.log(conv);

      let newConv = null;

      if (conv == null) {
        console.log('coucou');
        newConv = await Conversation.create({
          user1: user.id,
          user2: destinataire,
        });
      }
      console.log(newConv);

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

  // sendMessage: async (req, res) => {
  //   try {
  //     //const roomId = req.params.id;
  //     const { user } = req;
  //     const { content, destinataire } = req.body;

  //     const conversation = await Message.findOne({
  //       where: {
  //         destinataire: {
  //           [Op.or]: [user.id, destinataire],
  //         },
  //         expediteur: {
  //           [Op.or]: [user.id, destinataire],
  //         },
  //       },
  //     });

  //     const message = Message.build({
  //       content: content,
  //       expediteur: req.user.id,
  //       destinataire: destinataire,
  //     });

  //     conversation
  //       ? (message.conversation_id = conversation.conversation_id)
  //       : (message.conversation_id = 123);

  //     await message.save();

  //     res.status(201).json(message);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Erreur Serveur !" });
  //   }
  // },
};

module.exports = messageController;
