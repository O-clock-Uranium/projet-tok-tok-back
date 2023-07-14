const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "tag",
  }
);

module.exports = Tag;
