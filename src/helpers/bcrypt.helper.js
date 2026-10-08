import bcrypt from "bcrypt";

// recibe una contraseña normal y devuelve una versión encriptada que podemos guardar en la base de datos
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10); // el 10 indica la cantidad de rondas que bcrypt utiliza para generar el hash
};

// recibe la contraseña que escribe el usuario y el hash guardado en la base de datos
// bcrypt compara ambos valores sin necesidad de desencriptar la contraseña guardada
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword); // devuelve true si coinciden y false si no coinciden
};
