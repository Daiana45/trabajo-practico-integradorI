import { body, param } from "express-validator";

// valida los datos necesarios para registrar una cuenta publica
export const registerValidation = [
  // el username identifica al usuario dentro del sistema
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username no debe estar vacio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y numeros"),

  // el email debe tener formato correcto
  body("email") //Las validaciones son middlewares: body('email') mira el campo del cuerpo, y param('id') mira lo que viene en la URL.
    .trim() //Se encadenan reglas: notEmpty() , isEmail() , isLength() , puede llevar su mensaje con withMessage() . isInt() . Cada una
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe tener un formato valido"),

  // exigimos una contraseña con una complejidad minima
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

  // el nombre se guarda en el perfil relacionado con el usuario
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  // el apellido tambien es obligatorio al registrar la cuenta
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El apellido solo puede contener letras y espacios"),
];

// valida las credenciales necesarias para iniciar sesion
export const loginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio"),

  body("password")
    .notEmpty()
    .withMessage("La password es obligatoria"),
];

// valida la creacion de usuarios desde el panel de administracion
export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username no debe estar vacio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y numeros"),

  body("email")
    .trim()
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

  // solamente el administrador puede indicar el rol al crear una cuenta desde esta ruta
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser user o admin"),

  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El apellido solo puede contener letras y espacios"),
];

// valida los datos opcionales que se pueden modificar en un usuario
export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y numeros"),

  body("email")
    .optional()
    .trim()
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

// valida que un id recibido desde la url sea un numero entero
export const idValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];