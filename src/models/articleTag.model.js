import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    tag_id: {
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