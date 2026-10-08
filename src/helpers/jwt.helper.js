import jwt from "jsonwebtoken";

// recibe la informacion que queremos guardar dentro del token y genera un jwt firmado
export const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET, // utiliza la clave secreta guardada en .env para firmar el token
    {
      expiresIn: "1h", // indica que el token va a dejar de ser valido despues de una hora
    }
  );
};

// recibe un token y comprueba si fue firmado correctamente y si todavia es valido
export const verifyToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET // utiliza la misma clave secreta para comprobar el token
  );
};