import { Router } from "express";

import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createTagValidation,
  updateTagValidation,
} from "../middlewares/validations/tag.validate.js";

import { idValidation } from "../middlewares/validations/user.validate.js";

export const tagRouter = Router();

// solamente un administrador puede crear etiquetas
tagRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTagValidation,
  validate,
  createTag
);

// cualquier usuario autenticado puede consultar las etiquetas
tagRouter.get(
  "/",
  authMiddleware,
  getTags
);

// solamente un administrador puede consultar una etiqueta por id
tagRouter.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  idValidation,
  validate,
  getTagById
);

// solamente un administrador puede modificar etiquetas
tagRouter.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidation,
  validate,
  updateTag
);

// solamente un administrador puede eliminar etiquetas
tagRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  idValidation,
  validate,
  deleteTag
);
