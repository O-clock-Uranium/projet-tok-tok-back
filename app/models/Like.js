const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Like extends Model {}

Like.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: User,
      //   key: 'id'
      // }
    },
    post_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      // references: {
      //   model: Post,
      //   key: 'id'
      // }
    }
  },
  {
    sequelize,
    tableName: "like",
    modelName: 'Like'
  }
);

module.exports = Like;
