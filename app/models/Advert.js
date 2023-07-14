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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tag,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: "advert",
  }
);

module.exports = Advert;
