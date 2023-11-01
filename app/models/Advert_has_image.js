const { DataTypes, Model } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Advert_has_image extends Model {}

Advert_has_image.init(
  {
    advert_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "advert_has_image",
  }
);

module.exports = Advert_has_image;