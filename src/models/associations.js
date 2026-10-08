import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./articleTag.model.js";

// relacion 1:1 entre usuario y perfil
UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

// relacion 1:N entre usuario y articulos
UserModel.hasMany(ArticleModel, {
  foreignKey: "user_id",
  as: "articles",
});

ArticleModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
});

// relacion N:M entre articulos y etiquetas
ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
});

TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
});

export {
  UserModel,
  ProfileModel,
  ArticleModel,
  TagModel,
  ArticleTagModel,
};
