import "dotenv/config"; // carga las variables que tenemos guardadas en el archivo .env

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { startDB } from "./src/config/database.js";
import "./src/models/associations.js"; // importa las relaciones para que sequelize las conozca antes de sincronizar
import { userRouter } from "./src/routes/user.routes.js";

import { authRouter } from "./src/routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 3005; // usa el puerto del .env y si no existe utiliza 3005 como alternativa

app.use(
  cors({
    origin: "http://localhost:5173", // permite peticiones desde nuestro frontend
    credentials: true, // permite enviar y recibir cookies desde el frontend
  })
);

app.use(express.json()); // permite que express pueda recibir informacion en formato json

app.use(cookieParser()); // permite leer las cookies desde req.cookies

app.use("/api/auth", authRouter); // todas las rutas de auth empiezan con /api/auth

app.use("/api/users", userRouter); // todas las rutas de usuarios empiezan con /api/users

app.listen(PORT, async () => {
  await startDB(); // primero comprueba la conexion y sincroniza las tablas
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});