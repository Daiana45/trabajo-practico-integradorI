//los middlewares se ejecuta despues de que llega el pedido y antes de que llegue el controlado. Recibe tres cosas, req, res y next.
//si todo esta bien llama next(), si no corta el camino y manda error
//controladores retutilizables (validar y autenticar)

//la direccion es reglas -> validate -> controlador
//Verifica que el rol sea admin. Si no lo es: 403

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "No tienes permisos de administrador",
    }); // el usuario esta autenticado pero no tiene el rol necesario para acceder
  }

  next(); // si es administrador, permite continuar con el controller
};