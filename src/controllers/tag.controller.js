import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";

// crea una nueva etiqueta
export const createTag = async (req, res) => {
  try {
    const { name } = matchedData(req); // obtiene solamente el nombre que paso la validacion

    const tagExist = await TagModel.findOne({
      where: { name },
    }); // busca si ya existe una etiqueta con el mismo nombre

    if (tagExist) {
      return res.status(400).json({
        message: "La etiqueta ya existe",
      }); // no permitimos etiquetas repetidas
    }

    const tag = await TagModel.create({
      name,
    }); // crea la etiqueta en la base de datos

    return res.status(201).json({
      message: "Etiqueta creada correctamente",
      tag,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtiene todas las etiquetas
export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll(); // busca todas las etiquetas existentes

    return res.status(200).json(tags);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtiene una etiqueta por id
export const getTagById = async (req, res) => {
  try {
    const tag = await TagModel.findByPk(req.params.id); // busca la etiqueta usando el id recibido en la url

    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    return res.status(200).json(tag);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// modifica una etiqueta existente
export const updateTag = async (req, res) => {
  try {
    const tag = await TagModel.findByPk(req.params.id); // busca la etiqueta que queremos modificar

    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    const { name } = matchedData(req); // obtiene el nuevo nombre validado

    const tagExist = await TagModel.findOne({
      where: { name },
    }); // comprueba que el nuevo nombre no pertenezca a otra etiqueta

    if (tagExist && tagExist.id !== tag.id) {
      return res.status(400).json({
        message: "Ya existe una etiqueta con ese nombre",
      });
    }

    await tag.update({
      name,
    }); // actualiza el registro existente

    return res.status(200).json({
      message: "Etiqueta actualizada correctamente",
      tag,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// elimina una etiqueta
export const deleteTag = async (req, res) => {
  try {
    const tag = await TagModel.findByPk(req.params.id); // busca la etiqueta antes de eliminarla

    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    await tag.destroy(); // elimina fisicamente la etiqueta porque Tag no utiliza paranoid

    return res.status(200).json({
      message: "Etiqueta eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};