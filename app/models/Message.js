const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Message extends Model {}

Message.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // destinataire: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "message"
  }
);


module.exports = Message;
