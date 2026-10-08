import { body, param } from "express-validator";

export const createArticleValidation = [
  body("title")
    .notEmpty()
    .withMessage("El titulo no debe estar vacio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El titulo debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("El contenido no debe estar vacio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener como minimo 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),
];

export const updateArticleValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),

  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("El titulo debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener como minimo 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),
];