import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./articleTag.model.js";

// relacion 1:1: un usuario tiene un solo perfil
UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id", // indica que profile guarda el id del usuario
  as: "profile", // permite acceder al perfil con el alias profile
  onDelete: "CASCADE", // una eliminacion fisica del usuario elimina su perfil relacionado
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id", // indica que el perfil pertenece a un usuario
  as: "user", // permite acceder al usuario desde el perfil
});

// relacion 1:N: un usuario puede tener muchos articulos
UserModel.hasMany(ArticleModel, {
  foreignKey: "user_id", // cada articulo guarda el id de su autor
  as: "articles", // permite consultar los articulos de un usuario
});

ArticleModel.belongsTo(UserModel, {
  foreignKey: "user_id", // indica a que usuario pertenece cada articulo
  as: "author", // permite incluir al autor usando el alias author
});

// relacion N:M: un articulo puede tener muchas etiquetas
// y una misma etiqueta puede estar asociada a muchos articulos
ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel, // indica que la relacion se guarda en la tabla intermedia
  foreignKey: "article_id", // columna que identifica al articulo en la tabla intermedia
  otherKey: "tag_id", // columna que identifica a la etiqueta en la tabla intermedia
  as: "tags", // alias utilizado para consultar las etiquetas de un articulo
});

TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel, // reutiliza la misma tabla intermedia
  foreignKey: "tag_id", // columna que identifica a la etiqueta
  otherKey: "article_id", // columna que identifica al articulo
  as: "articles", // alias utilizado para consultar los articulos de una etiqueta
});

// relaciones directas para poder consultar el articulo o la etiqueta desde ArticleTag
ArticleTagModel.belongsTo(ArticleModel, {
  foreignKey: "article_id", // relaciona el registro intermedio con su articulo
  as: "article",
});

ArticleTagModel.belongsTo(TagModel, {
  foreignKey: "tag_id", // relaciona el registro intermedio con su etiqueta
  as: "tag",
});

// exporta los modelos para permitir su reutilizacion en otros archivos
export {
  UserModel,
  ProfileModel,
  ArticleModel,
  TagModel,
  ArticleTagModel,
};