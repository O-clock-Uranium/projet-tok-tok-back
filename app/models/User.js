const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.VARCHAR(64),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.VARCHAR(64),
      allowNull: false,
    },
    description: {
      type: DataTypes.VARCHAR(255),
      //By default, null is an allowed value for every column of a model
      //dans la table il n'y a rien de marqué on peut donc estimer que le user n'est pas obliger de mettre une descitpion right?
    },
    adress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.VARCHAR(64),
      allowNull: false,
    },
    password: {
      type: DataTypes.VARCHAR(64),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);

module.exports = User;
