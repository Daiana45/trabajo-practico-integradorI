//Verifica que seas el dueño del recurso (por ejemplo, el autor del artículo)

import { ArticleModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id); // busca el articulo usando el id que viene en la url

    if (!article) {
      return res.status(404).json({
        message: "Articulo no encontrado",
      }); // no podemos comprobar el propietario si el articulo no existe
    }

    if (req.user.role === "admin") {
      return next(); // el administrador puede modificar o eliminar cualquier articulo
    }

    if (article.user_id !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permisos sobre este articulo",
      }); // el articulo existe pero pertenece a otro usuario
    }

    req.article = article; // guardamos el articulo para poder reutilizarlo en el controller

    next(); // el usuario es el propietario y puede continuar
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};