export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "No tienes permisos de administrador",
    }); // el usuario esta autenticado pero no tiene el rol necesario para acceder
  }

  next(); // si es administrador, permite continuar con el controller
};