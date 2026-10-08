import { body, param } from "express-validator";

export const createTagValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la etiqueta no debe estar vacio")
    .isLength({ min: 2, max: 30 })
    .withMessage("La etiqueta debe tener entre 2 y 30 caracteres")
    .not()
    .contains(" ")
    .withMessage("La etiqueta no puede contener espacios"),
];

export const updateTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),

  body("name")
    .notEmpty()
    .withMessage("El nombre de la etiqueta no debe estar vacio")
    .isLength({ min: 2, max: 30 })
    .withMessage("La etiqueta debe tener entre 2 y 30 caracteres")
    .not()
    .contains(" ")
    .withMessage("La etiqueta no puede contener espacios"),
];