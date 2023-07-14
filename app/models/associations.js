const Message = require("./Message");
const User = require("./user");
//J'ai du mettre le User en user car sensible à la casse voir avec Chloé
const Advert = require("./Advert");
const Advert_has_image = require("./Advert_has_image");

// One-To-One
// - `hasOne` + `belongsTo`

// One-To-Many
// - `hasMany` + `belongsTo`

// Many-To-Many
// - `belongsToMany` + `belongsToMany`

module.exports = {
  Message,
  User,
  Advert,
  Advert_has_image,
};
