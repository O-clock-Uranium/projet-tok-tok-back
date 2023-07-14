const Message = require("./Message");
const User = require("./user");
//J'ai du mettre le User en user car sensible à la casse voir avec Chloé
const Advert = require("./Advert");
const Advert_has_image = require("./Advert_has_image");
const Favourite = require("./Favourite");
const Like = require("./Like");
const Post = require("./Post");
const Tag = require("./Tag");

// One-To-One
// - `hasOne` + `belongsTo`

// One-To-Many
// - `hasMany` + `belongsTo`
User.hasMany(Post, {
  foreignKey: "user_id",
});
Post.belongsTo(User);

User.hasMany(Advert, {
  foreignKey: "user_id",
});
Advert.belongsTo(User);

Advert.hasMany(Advert_has_image, {
  foreignKey: "advert_id",
});
Advert_has_image.belongsTo(Advert);

Tag.hasMany(Advert, {
  foreignKey: "tag_id",
});
Advert.belongsTo(Tag);

//Messages
User.hasMany(Message, {
  foreignKey: 'expediteur'
});
User.hasMany(Message, {
  foreignKey: 'destinataire'
});
Message.belongsTo(User);

// Many-To-Many
// - `belongsToMany` + `belongsToMany`
User.belongsToMany(Post, { through: Like });
Post.belongsToMany(User, { through: Like });

User.belongsToMany(Post, { through: Favourite });
Post.belongsToMany(User, { through: Favourite });

async function test() {
  const res = await Advert.findAll();
  console.log(res);
}

test();

// module.exports = {
//   Message,
//   User,
//   Advert,
//   Advert_has_image,
// };
