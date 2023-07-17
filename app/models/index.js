// Un fichier passe plat pour exporter au reste du monde nos données :
const { Message, User, Advert, Advert_has_image, Post, Like, Favourite, Tag } = require("./associations");


module.exports = { Message, User, Advert,Advert_has_image, Post, Like, Favourite, Tag };
