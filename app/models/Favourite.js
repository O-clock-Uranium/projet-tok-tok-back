const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Favourite extends Model {}

Favourite.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    advert_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "favourite",
  }
);

module.exports = Favourite;
