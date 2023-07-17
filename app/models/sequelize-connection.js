// Instance de connexion vers notre BDD qui tourne qqpart.
// L'équivalent en Sequelize du fichier database.js en pg

require("dotenv").config();

const { Sequelize } = require("sequelize");

// Passing a connection URI
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
    createdAt: "created_at", // Pour TOUS nos modèles, on modifie le mapping par défaut du created_at
    updatedAt: "updated_at",
  },
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
