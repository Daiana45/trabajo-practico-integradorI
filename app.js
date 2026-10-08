import "dotenv/config"; // carga las variables de entorno definidas en el archivo .env

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { startDB } from "./src/config/database.js";

// importa las relaciones para que sequelize las conozca antes de sincronizar las tablas
import "./src/models/associations.js";

// importa los routers que agrupan las rutas de cada funcionalidad
import { authRouter } from "./src/routes/auth.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
import { articleRouter } from "./src/routes/article.routes.js";
import { articleTagRouter } from "./src/routes/articleTag.routes.js";

// crea la aplicacion de express
const app = express();

// obtiene el puerto del archivo .env; si no existe, utiliza el puerto 3005
const PORT = process.env.PORT || 3005;

// configura cors para permitir peticiones desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // direccion habitual del servidor de desarrollo de vite
    credentials: true, // permite que el navegador envie y reciba cookies
  })
);

// permite recibir y procesar datos enviados en formato json
app.use(express.json());

// permite acceder a las cookies recibidas mediante req.cookies
app.use(cookieParser());

// registra las rutas de autenticacion y perfiles
app.use("/api/auth", authRouter);

// registra las rutas de administracion de usuarios
app.use("/api/users", userRouter);

// registra las rutas para consultar y administrar etiquetas
app.use("/api/tags", tagRouter);

// registra las rutas para crear, consultar, modificar y eliminar articulos
app.use("/api/articles", articleRouter);

// registra las rutas para asignar y quitar etiquetas de los articulos
app.use("/api/articles-tags", articleTagRouter);

// inicia el servidor y comprueba la conexion con la base de datos
app.listen(PORT, async () => {
  await startDB(); // intenta conectarse a mysql y sincronizar los modelos
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});