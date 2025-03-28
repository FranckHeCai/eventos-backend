import express from "express";
import Controller from "../../controller";
import { asyncHandler } from "@Application/middlewares/error-handler";
// Para operaciones con acceso restringido, introduciremos un segundo parámetro que será la variable restrictedAccess
import restrictedAccess from "@Application/middlewares/restricted-access";
import { decodeBase64Token } from "entities/auth/service";

const router = express.Router();

// GET ALL
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    console.log("Autenticando")

    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader) {
      return res.status(401).json({
        status: 401,
        error: "Token no proporcionado o formato incorrecto",
      });
    }

    // Obtener el token eliminando el prefijo "Bearer "
    const token = authHeader.split(" ")[1];

    console.log("Este es el token del usuario:", token)
    const data = await Controller.login(token);
    res.send(data);
  })
);

export default (app) => app.use("/auth", router);
