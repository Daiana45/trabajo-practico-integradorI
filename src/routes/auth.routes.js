import { Router } from "express";

import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { profileValidation } from "../middlewares/validations/profile.validate.js";
import { validate } from "../middlewares/validate.js";

export const authRouter = Router();

// registro publico, no necesita estar autenticado
authRouter.post("/register", register);

// login publico, el usuario todavia no tiene cookie de autenticacion
authRouter.post("/login", login);

// desde aca necesitamos que el usuario tenga un jwt valido
authRouter.get("/profile", authMiddleware, getProfile);

// solamente puede modificar su propio perfil porque usamos req.user.id
authRouter.put(
  "/profile",
  authMiddleware,
  profileValidation,
  validate,
  updateProfile
);

// para cerrar sesion necesitamos que el usuario este autenticado
authRouter.post("/logout", authMiddleware, logout);
