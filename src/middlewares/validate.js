import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req); // obtiene todos los errores que produjeron las validaciones anteriores

  if (!errors.isEmpty()) { // comprueba si existe al menos un error de validacion
    const custom = errors.formatWith((error) => {
      return {
        campo: error.path, // indica el nombre del campo que produjo el error
        mensaje: error.msg, // muestra el mensaje que nosotros definimos en withMessage()
      };
    });

    return res.status(400).json({
      message: "Error de validacion",
      errors: custom.array(), // convierte los errores en un array para devolverlos en la respuesta
    });
  }

  next(); // si no hay errores, permite que la peticion continue hacia el siguiente middleware o controlador
};