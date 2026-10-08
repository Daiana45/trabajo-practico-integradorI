import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

// obtiene todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: {
        exclude: ["password"],
      }, // nunca mostramos las contraseñas aunque esten guardadas como hash

      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
      ], // tambien mostramos el perfil relacionado mediante la relacion 1:1
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// obtiene un usuario por su id
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      }, // excluimos la contraseña de la respuesta

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
    });
  }
};

// crea un usuario desde el panel de administracion
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, first_name, last_name } =
      matchedData(req); // obtiene solamente los datos que pasaron las validaciones

    const emailExist = await UserModel.findOne({
      where: { email },
    }); // comprueba que el email no este repetido

    if (emailExist) {
      return res.status(400).json({
        message: "El email ya esta registrado",
      });
    }

    const usernameExist = await UserModel.findOne({
      where: { username },
    }); // comprueba que el username no este repetido

    if (usernameExist) {
      return res.status(400).json({
        message: "El username ya esta registrado",
      });
    }

    const hashedPassword = await hashPassword(password); // nunca guardamos la contraseña original

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user", // si no se indica un rol, se crea como usuario normal
    });

    await ProfileModel.create({
      user_id: user.id,
      first_name,
      last_name,
    }); // crea el perfil relacionado con el usuario

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// modifica los datos de un usuario
export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    //const data = matchedData(req); // obtiene solamente los campos validados

    const data = matchedData(req, {
  locations: ["body"],
}); // obtenemos solo los campos del body y evitamos incluir el id de la url

    if (data.password) {
      data.password = await hashPassword(data.password); // si cambia la contraseña, tambien debemos volver a generar el hash
    }

    await user.update(data);

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// elimina logicamente un usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    await user.destroy(); // como User tiene paranoid:true, no se borra fisicamente y se completa deleted_at

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
