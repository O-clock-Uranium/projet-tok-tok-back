const Message = require("./Message");
const User = require("./User");
const Advert = require("./Advert");
const Advert_has_image = require("./Advert_has_image");
const Favourite = require("./Favourite");
const Like = require("./Like");
const Post = require("./Post");
const Tag = require("./Tag");
const Conversation = require("./Conversation");

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

Post.hasMany(Post, {
  foreignKey: "reply_to",
  as: "replies"
});
Post.belongsTo(Post, {
  foreignKey: "reply_to",
  as: "original_post"
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

// Messages
Conversation.hasMany(Message, {
  foreignKey: "conversation_id",
  as: "messages"
});

Message.belongsTo(Conversation, {
  foreignKey: "conversation_id",
  as: "conv"
});

User.hasMany(Message, {
  foreignKey: "sender",
  as: "messages_sent"
});

Message.belongsTo(User, {
  foreignKey: "sender",
  as: "message_sender",
});

User.hasMany(Conversation, {
  foreignKey: "user1",
  as: "user_one_conversations"
});

Conversation.belongsTo(User, {
  foreignKey: "user1",
  as: "user_one_info",
});

User.hasMany(Conversation, {
  foreignKey: "user2",
  as: "user_two_conversations",
});

Conversation.belongsTo(User, {
  foreignKey: "user2",
  as: "user_two_info",
});


//Messages
// User.hasMany(Message, {
//   foreignKey: "expediteur",
//   as: "messages_sent",
// });
// User.hasMany(Message, {
//   foreignKey: "destinataire",
//   as: "messages_received",
// });
// Message.belongsTo(User, {
//   foreignKey: "expediteur",
//   as: "info_expediteur",
// });
// Message.belongsTo(User, {
//   foreignKey: "destinataire",
//   as: "info_destinataire",
// });

// Many-To-Many
// - `belongsToMany` + `belongsToMany`
User.belongsToMany(Post, {
  foreignKey: "user_id",
  as: "liked",
  through: Like
});
Post.belongsToMany(User, {
  foreignKey: "post_id",
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

//! doublon ? 
// Advert.belongsToMany(User, {
//   foreignKey: "advert_id",
//   as: "favourited",
//   through: Favourite
// });
// User.belongsToMany(Advert, {
//   foreignKey: "user_id",
//   as: "users_favourited",
//   through: Favourite
// });

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
