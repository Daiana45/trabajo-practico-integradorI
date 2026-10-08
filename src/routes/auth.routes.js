import { Router } from "express";

import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/user.validate.js";

import {
  updateProfileValidation,
} from "../middlewares/validations/profile.validate.js";

export const authRouter = Router();

// registro publico: cualquier persona puede crear su propia cuenta
authRouter.post(
  "/register",
  registerValidation, // valida username, email, password, nombre y apellido
  validate, // devuelve los errores si los datos no cumplen las reglas
  register // crea el usuario y su perfil
);

// inicio de sesion publico: todavia no requiere una cookie valida
authRouter.post(
  "/login",
  loginValidation, // comprueba que se hayan enviado username y password
  validate,
  login // compara la contraseña y genera la cookie con el jwt
);

// devuelve los datos de la cuenta que corresponde a la sesion actual
authRouter.get(
  "/profile",
  authMiddleware, // verifica la cookie y carga al usuario en req.user
  getProfile
);

// permite modificar el perfil del usuario autenticado, no el de otra persona
authRouter.put(
  "/profile",
  authMiddleware,
  updateProfileValidation, // permite enviar solamente los campos que queremos cambiar
  validate,
  updateProfile
);

// cierra la sesion eliminando la cookie de autenticacion
authRouter.post(
  "/logout",
  authMiddleware,
  logout
);