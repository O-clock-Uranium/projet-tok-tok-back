const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Like extends Model {}

Like.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "like",
    modelName: 'Like'
  }
);

module.exports = Like;
