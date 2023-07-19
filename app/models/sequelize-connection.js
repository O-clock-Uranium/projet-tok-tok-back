require("dotenv").config();

const { Sequelize } = require("sequelize");

// Passing a connection URI
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Tout à fait possible de tester si la connexion se passe bien !
sequelize
  .authenticate()
  .then(() => {
    console.log("OK");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = sequelize;
