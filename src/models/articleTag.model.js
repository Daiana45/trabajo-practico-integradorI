import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


//en muchos a muchos crea una tabla intermedia oara poner los id.

export const ArticleTagModel = sequelize.define(
  "ArticleTag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Articles",
        key: "id",
      },
      //la alternativa logica es con paranoid: true; el registro no se borra solo se pone la fecha con deletedAT, requiere que el modelo tenga timestaps() y destroy()
      //con paranoid: false, se usan en las consultas.
      onDelete: "CASCADE", //en muchos a muchos se borran las tablas intermedias  Con CASCADE configurado, borrar al padre borra a los hijos automáticamente.
      onUpdate: "CASCADE",
    },

    tag_id: { //nombre de los fk van en snake_case  y minuscula para que el modelo y la base coincidan.
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tags",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

//