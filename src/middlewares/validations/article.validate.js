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
    .optional() //puede venir o no
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),
];

export const updateArticleValidation = [
//se puede validar que exista algo en la base de datos usando .custom(async (id) => {
    //const usuario = await buscarUsuario(id);
    //if (!usuario) {
        //throw new Error("El usuario no existe");
    //}
    //return true;
//})

  param("id") //en los id se puede validar que sean entero positivos y que existan en la base de datos.
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