const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Conversation extends Model {}

Conversation.init(
  {
    user1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "conversation"
  }
);


module.exports = Conversation;
