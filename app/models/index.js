// Un fichier passe plat pour exporter au reste du monde nos données :
const { Message, User, Advert, Advert_has_image } = require("./associations");

module.exports = { Message, User, Advert,Advert_has_image };
