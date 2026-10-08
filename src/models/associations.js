import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./articleTag.model.js";

// relacion 1:1 entre usuario y perfil
UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id", // indica qué columna de Profile relaciona al usuario
  as: "profile", // alias que vamos a usar cuando hagamos include
  onDelete: "CASCADE", // si se elimina físicamente el usuario, elimina también su perfil
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
  through: ArticleTagModel, // indica que la relacion n:m pasa por la tabla intermedia
  foreignKey: "article_id", // fk de Article dentro de ArticleTag
  otherKey: "tag_id", // fk de Tag dentro de ArticleTag
  as: "tags", // nombre que usaremos para acceder a las etiquetas
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
