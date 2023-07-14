const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Advert extends Model {}

Advert.init(
  {
    title: {
      type: DataTypes.VARCHAR(64),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    //besoin de mettre user id?
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "advert",
  }
);

module.exports = Advert;
