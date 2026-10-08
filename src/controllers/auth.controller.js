import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

// registra un usuario nuevo en el sistema
export const register = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = matchedData(req); // obtiene solamente los datos que pasaron las validaciones

    const userExist = await UserModel.findOne({
      where: {
        email,
      },
    }); // busca si ya existe un usuario con ese email

    if (userExist) {
      return res.status(400).json({
        message: "El email ya esta registrado",
      }); // evita crear dos usuarios con el mismo email
    }

    const usernameExist = await UserModel.findOne({
      where: {
        username,
      },
    }); // tambien comprobamos que el username no este repetido

    if (usernameExist) {
      return res.status(400).json({
        message: "El username ya esta registrado",
      });
    }

    const hashedPassword = await hashPassword(password); // transforma la contraseña original en un hash antes de guardarla

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: "user", // los registros publicos siempre comienzan como usuarios normales
    });

    await ProfileModel.create({
      user_id: user.id,
      first_name,
      last_name,
    }); // crea el perfil relacionado usando el id del usuario recién creado

    return res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// inicia sesion con las credenciales del usuario
export const login = async (req, res) => {
  try {
    const { username, password } = req.body; // obtiene las credenciales enviadas por el usuario

    const user = await UserModel.findOne({
      where: {
        username,
      },
    }); // busca el usuario por username

    if (!user) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      }); // no indicamos si fallo el usuario o la contraseña por seguridad
    }

    const validPassword = await comparePassword(
      password,
      user.password
    ); // compara la contraseña escrita con el hash guardado en la base de datos

    if (!validPassword) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const token = generateToken({
      idUser: user.id,
    }); // genera un jwt guardando el id del usuario para poder identificarlo después

    res.cookie("token", token, {
      httpOnly: true, // javascript del navegador no puede leer directamente esta cookie
      maxAge: 1000 * 60 * 60, // la cookie dura una hora
      sameSite: "lax", // ayuda a evitar ciertos envios de cookies desde sitios externos
    });

    return res.status(200).json({
      message: "Login exitoso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// obtiene los datos del usuario que actualmente esta autenticado
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      }, // nunca devolvemos la contraseña en una respuesta
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// modifica los datos del perfil del usuario autenticado
export const updateProfile = async (req, res) => {
  try {
    const validatedData = matchedData(req); // obtiene solamente los datos que fueron validados

    const profile = await ProfileModel.findOne({
      where: {
        user_id: req.user.id,
      },
    }); // busca el perfil que pertenece al usuario autenticado

    if (!profile) {
      return res.status(404).json({
        message: "Perfil no encontrado",
      });
    }

    await profile.update(validatedData); // actualiza solamente los campos recibidos

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      profile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// cierra la sesion eliminando la cookie que contiene el jwt
export const logout = (req, res) => {
  res.clearCookie("token"); // elimina la cookie del navegador

  return res.status(200).json({
    message: "Logout exitoso",
  });
};
