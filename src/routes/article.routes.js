import { Router } from "express";

import {
  createArticle,
  getArticles,
  getArticleById,
  getMyArticles,
  getArticlesByUser,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createArticleValidation,
  updateArticleValidation,
} from "../middlewares/validations/article.validate.js";

import { idValidation } from "../middlewares/validations/user.validate.js";

export const articleRouter = Router();

// cualquier usuario autenticado puede crear un articulo
articleRouter.post(
  "/",
  authMiddleware,
  createArticleValidation,
  validate,
  createArticle
);

// cualquier usuario autenticado puede consultar todos los articulos
articleRouter.get(
  "/",
  authMiddleware,
  getArticles
);

// esta ruta debe estar antes de /:id
// de lo contrario express podria interpretar "user" como si fuera un id
articleRouter.get(
  "/user",
  authMiddleware,
  getMyArticles
);

// obtiene los articulos de un usuario determinado
articleRouter.get(
  "/user/:id",
  authMiddleware,
  idValidation,
  validate,
  getArticlesByUser
);

// obtiene un articulo especifico
articleRouter.get(
  "/:id",
  authMiddleware,
  idValidation,
  validate,
  getArticleById
);

// solamente el propietario o un administrador puede modificar
articleRouter.put(
  "/:id",
  authMiddleware,
  updateArticleValidation,
  validate,
  ownerMiddleware,
  updateArticle
);

// solamente el propietario o un administrador puede eliminar
articleRouter.delete(
  "/:id",
  authMiddleware,
  idValidation,
  validate,
  ownerMiddleware,
  deleteArticle
);