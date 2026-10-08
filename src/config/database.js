import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const startDB = async () => {
  try {
    await sequelize.authenticate(); // comprueba la conexion con la base de datos
    await sequelize.sync(); // sincroniza los modelos con las tablas

    console.log("Conexion a la bd exitosa");
  } catch (error) {
    console.error("Error al conectar con la bd:", error.message);
  }
};
