const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-connection");

class Post extends Model {}

Post.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.TEXT
  },
  
  
  },
});
