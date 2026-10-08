import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // obtiene el jwt que guardamos anteriormente dentro de la cookie

    if (!token) {
      return res.status(401).json({
        message: "No estas autenticado",
      }); // si no existe cookie, significa que el usuario no inicio sesion
    }

    const decoded = verifyToken(token); // verifica que el token sea valido y obtiene la informacion que guardamos dentro de el

    const user = await UserModel.findByPk(decoded.idUser); // busca en la base de datos al usuario correspondiente al id guardado en el token

    if (!user) {
      return res.status(401).json({
        message: "Usuario no encontrado",
      }); // aunque el token sea valido, el usuario puede no existir o haber sido eliminado
    }

    req.user = user; // guardamos el usuario en req para que los siguientes middlewares y controllers puedan acceder a el

    next(); // si todo esta correcto, permite continuar con la peticion
  } catch (error) {
    return res.status(401).json({
      message: "Token invalido o expirado",
    }); // jwt.verify genera un error si el token no es valido o ya vencio
  }
};