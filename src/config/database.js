import { Sequelize } from "sequelize"; //es lo que nos permite crear una conexion con la bd

//la conexion con la bd

export const sequelize = new Sequelize( //new nos dice que estamos creando una nueva instancia de sequelize, en esta nueva instancia estamos creando un objeto que va a tener la configuracion necesaria oara conectarse a nuestra base.
  process.env.DB_NAME, //accedemos a los datos 
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, //|| cuando no hay un puerto definido le podemos pasar un puerto predeterminado.
    dialect: "mysql",
  }
);

export const startDB = async () => {
  try {
    await sequelize.authenticate(); // comprueba la conexion con la base de datos //metodo cuando tiene () 
    await sequelize.sync(); // sincroniza los modelos con las tablas //force: false para testaer, force: true borra todo y recrear y alter: true actualiza las tablas segun cambios que hiciste en tus modelos
    //sync crea las tablas a partir de los modelos.

    console.log("Conexion a la bd exitosa");
  } catch (error) {
    console.error("Error al conectar con la bd:", error.message); //no puede ir res.status porque no recibe una peticion.
  }
};
