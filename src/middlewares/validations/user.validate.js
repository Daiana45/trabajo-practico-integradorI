import { body, param } from "express-validator";

// validaciones para crear un usuario
export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("El username no debe estar vacio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y numeros"),

  body("email")
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe tener un formato valido"),

  body("password")
    .notEmpty()
    .withMessage("La password no debe estar vacia")
    .isLength({ min: 8 })
    .withMessage("La password debe tener como minimo 8 caracteres")
    .matches(/[a-z]/)
    .withMessage("La password debe tener al menos una letra minuscula")
    .matches(/[A-Z]/)
    .withMessage("La password debe tener al menos una letra mayuscula")
    .matches(/[0-9]/)
    .withMessage("La password debe tener al menos un numero"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser user o admin"),
];

// validaciones para modificar un usuario
export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),

  body("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y numeros"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("El email debe tener un formato valido"),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La password debe tener como minimo 8 caracteres")
    .matches(/[a-z]/)
    .withMessage("La password debe tener al menos una letra minuscula")
    .matches(/[A-Z]/)
    .withMessage("La password debe tener al menos una letra mayuscula")
    .matches(/[0-9]/)
    .withMessage("La password debe tener al menos un numero"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser user o admin"),
];

// validacion reutilizable para ids
export const idValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];
