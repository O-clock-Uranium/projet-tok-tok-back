const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Favourite extends Model {}

Favourite.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: User,
      //   key: 'id'
      // }
    },
    advert_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      // references: {
      //   model: Advert,
      //   key: 'id'
      // }
    }
  },
  {
    sequelize,
    tableName: "favourite",
  }
);

module.exports = Favourite;
