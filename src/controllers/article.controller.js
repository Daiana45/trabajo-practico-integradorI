import { matchedData } from "express-validator";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { TagModel } from "../models/tag.model.js";

// crea un articulo perteneciente al usuario autenticado
export const createArticle = async (req, res) => {
  try {
    const data = matchedData(req); // obtiene solamente los campos que pasaron las validaciones

    const article = await ArticleModel.create({
      ...data,
      user_id: req.user.id, // el autor sale del usuario autenticado, no del body
    });

    return res.status(201).json({
      message: "Articulo creado correctamente",
      article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtiene todos los articulos
export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: TagModel,
          as: "tags",
        },
      ],
    }); // incluye el autor y las etiquetas relacionadas con cada articulo

    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtiene un articulo por su id
export const getArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: TagModel,
          as: "tags",
        },
      ],
    }); // busca el articulo e incluye sus relaciones

    if (!article) {
      return res.status(404).json({
        message: "Articulo no encontrado",
      });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtiene solamente los articulos del usuario autenticado
export const getMyArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: TagModel,
          as: "tags",
        },
      ],
    }); // el id se obtiene del usuario autenticado

    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtiene los articulos pertenecientes a un usuario determinado
export const getArticlesByUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const articles = await ArticleModel.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [
        {
          model: TagModel,
          as: "tags",
        },
      ],
    }); // busca todos los articulos cuyo user_id coincide con el id recibido

    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// modifica un articulo
export const updateArticle = async (req, res) => {
  try {
   // const data = matchedData(req); // obtiene solamente los campos validados

   const data = matchedData(req, {
  locations: ["body"],
}); // solo permitimos actualizar los campos validados que llegaron en el body

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Debes enviar al menos un campo para actualizar",
      });
    }

    await req.article.update(data); // ownerMiddleware ya comprobo que el usuario puede modificarlo

    return res.status(200).json({
      message: "Articulo actualizado correctamente",
      article: req.article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// elimina logicamente un articulo
export const deleteArticle = async (req, res) => {
  try {
    await req.article.destroy(); // Article tiene paranoid:true, por eso no se elimina fisicamente

    return res.status(200).json({
      message: "Articulo eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};