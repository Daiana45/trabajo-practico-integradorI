import { matchedData } from "express-validator";
import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";
import { ArticleTagModel } from "../models/articleTag.model.js";

// crea una relacion entre un articulo y una etiqueta
export const createArticleTag = async (req, res) => {
  try {
    // obtenemos solamente los datos que pasaron las validaciones
    const { article_id, tag_id } = matchedData(req);

    // buscamos el articulo que queremos relacionar con la etiqueta
    const article = await ArticleModel.findByPk(article_id);

    // si el articulo no existe, no podemos crear la relacion
    if (!article) {
      return res.status(404).json({
        message: "Articulo no encontrado",
      });
    }

    // buscamos la etiqueta que queremos asignar al articulo
    const tag = await TagModel.findByPk(tag_id);

    // comprobamos que la etiqueta exista antes de crear la relacion
    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    // comprobamos que el usuario autenticado sea el autor del articulo
    // esta operacion solo puede realizarla el propietario del articulo
    if (article.user_id !== req.user.id) {
      return res.status(403).json({
        message: "Solo el autor puede asignar etiquetas a este articulo",
      });
    }

    // comprobamos si la misma etiqueta ya fue asignada a ese articulo
    const relationExist = await ArticleTagModel.findOne({
      where: {
        article_id,
        tag_id,
      },
    });

    // evitamos guardar dos veces la misma relacion
    if (relationExist) {
      return res.status(400).json({
        message: "Esta etiqueta ya esta asignada al articulo",
      });
    }

    // guardamos la relacion usando los ids de las dos tablas
    const relation = await ArticleTagModel.create({
      article_id,
      tag_id,
    });

    // respondemos con codigo 201 porque se creo un nuevo registro
    return res.status(201).json({
      message: "Etiqueta asignada correctamente",
      relation,
    });
  } catch (error) {
    // mostramos el error en la terminal para facilitar la depuracion
    console.error(error);

    // respondemos con un error generico para no exponer detalles internos
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// elimina la relacion entre un articulo y una etiqueta
export const deleteArticleTag = async (req, res) => {
  try {
    // buscamos la relacion mediante el id que llega desde la url
    const relation = await ArticleTagModel.findByPk(
      req.params.articleTagId
    );

    // si no existe la relacion, no hay nada que eliminar
    if (!relation) {
      return res.status(404).json({
        message: "Relacion no encontrada",
      });
    }

    // buscamos el articulo al que pertenece esta relacion
    const article = await ArticleModel.findByPk(relation.article_id);

    // si el articulo ya no esta disponible, no podemos comprobar su propietario
    if (!article) {
      return res.status(404).json({
        message: "Articulo no encontrado",
      });
    }

    // solo el autor del articulo puede quitarle una etiqueta
    if (article.user_id !== req.user.id) {
      return res.status(403).json({
        message: "Solo el autor puede eliminar esta relacion",
      });
    }

    // eliminamos el registro de la tabla intermedia
    await relation.destroy();

    // devolvemos una respuesta exitosa
    return res.status(200).json({
      message: "Etiqueta quitada del articulo correctamente",
    });
  } catch (error) {
    // registramos el error para revisarlo desde la terminal
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};