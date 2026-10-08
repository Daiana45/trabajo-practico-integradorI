import { body } from "express-validator";

export const profileValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("last_name")
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografia no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("El avatar_url debe ser una URL valida"),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe tener un formato valido"),
];
