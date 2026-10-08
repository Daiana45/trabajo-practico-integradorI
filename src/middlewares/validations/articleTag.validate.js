import { body, param } from "express-validator";

// validaciones para crear una relacion entre un articulo y una etiqueta
export const createArticleTagValidation = [
  // article_id debe existir en el body y ser un numero entero
  body("article_id")
    .notEmpty()
    .withMessage("El id del articulo es obligatorio")
    .isInt()
    .withMessage("El id del articulo debe ser un numero entero"),

  // tag_id debe existir en el body y ser un numero entero
  body("tag_id")
    .notEmpty()
    .withMessage("El id de la etiqueta es obligatorio")
    .isInt()
    .withMessage("El id de la etiqueta debe ser un numero entero"),
];

// validaciones para eliminar una relacion mediante su id
export const deleteArticleTagValidation = [
  // param obtiene el dato desde la url, no desde el body
  param("articleTagId")
    .isInt()
    .withMessage("El id de la relacion debe ser un numero entero"),
];