const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Like extends Model {}

Like.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
      // references: {
      //   model: User,
      //   key: 'id'
      // }
    },
    post_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'post_id'
      // references: {
      //   model: Post,
      //   key: 'id'
      // }
    }
  },
  {
    sequelize,
    tableName: "like",
    modelName: 'like'
  }
);

module.exports = Like;
