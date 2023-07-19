const Message = require("./Message");
const User = require("./user");
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
  as: "posts",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
  as: "post_creator",
});

User.hasMany(Advert, {
  foreignKey: "user_id",
  as: "adverts",
});
Advert.belongsTo(User, {
  foreignKey: "user_id",
  as: "advert_creator",
});

Advert.hasMany(Advert_has_image, {
  foreignKey: "advert_id",
  as: "images",
});
Advert_has_image.belongsTo(Advert, {
  foreignKey: "advert_id",
  as: "advert",
});

Tag.hasMany(Advert, {
  foreignKey: "tag_id",
  as: "advert",
});
Advert.belongsTo(Tag, {
  foreignKey: "tag_id",
  as: "tag",
});

//Messages
User.hasMany(Message, {
  foreignKey: "expediteur",
  as: "messages_sent",
});
User.hasMany(Message, {
  foreignKey: "destinataire",
  as: "messages_received",
});
Message.belongsTo(User, {
  foreignKey: "expediteur",
  as: "message_expediteur",
});
Message.belongsTo(User, {
  foreignKey: "destinataire",
  as: "message_destinataire",
});

// Many-To-Many
// - `belongsToMany` + `belongsToMany`
User.belongsToMany(Post, {
  foreignKey: "user_id",
  as: "liked",
  through: Like
});
Post.belongsToMany(User, {
  // foreignKey: "post_id",
  as: "users_liked",
  through: Like
});

User.belongsToMany(Advert, {
  foreignKey: "user_id",
  as: "favourites",
  through: Favourite
});
Advert.belongsToMany(User, {
  foreignKey: "advert_id",
  as: "favorited_by",
  through: Favourite
});

module.exports = {
  Message,
  User,
  Advert,
  Advert_has_image,
  Like,
  Post,
  Tag,
  Favourite,
};
