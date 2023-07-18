const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    localization: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.TEXT
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);

module.exports = User;
