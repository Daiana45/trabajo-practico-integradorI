import { Router } from "express";

import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createArticleTagValidation,
  deleteArticleTagValidation,
} from "../middlewares/validations/articleTag.validate.js";

// crea el router encargado de las relaciones entre articulos y etiquetas
export const articleTagRouter = Router();

// asigna una etiqueta a un articulo
articleTagRouter.post(
  "/",
  authMiddleware, // comprueba que el usuario tenga una sesion iniciada
  createArticleTagValidation, // valida article_id y tag_id
  validate, // comprueba si las validaciones encontraron errores
  createArticleTag // crea la relacion en la tabla intermedia
);

// elimina una etiqueta de un articulo
articleTagRouter.delete(
  "/:articleTagId",
  authMiddleware, // comprueba que el usuario este autenticado
  deleteArticleTagValidation, // valida el id de la relacion
  validate, // comprueba los errores de validacion
  deleteArticleTag // elimina la relacion
);