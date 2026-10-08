import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createUserValidation,
  updateUserValidation,
  idValidation,
} from "../middlewares/validations/user.validate.js";

export const userRouter = Router();

// todas las rutas de usuarios requieren autenticacion y rol administrador
userRouter.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getUsers
);

userRouter.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  idValidation,
  validate,
  getUserById
);

userRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createUserValidation,
  validate,
  createUser
);

userRouter.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  validate,
  updateUser
);

userRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  idValidation,
  validate,
  deleteUser
);