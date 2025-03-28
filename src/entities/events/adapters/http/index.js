import express from "express";
import Controller from "../../controller";
import { asyncHandler } from "@Application/middlewares/error-handler";
// Para operaciones con acceso restringido, introduciremos un segundo parámetro que será la variable restrictedAccess
import restrictedAccess from "@Application/middlewares/restricted-access";

const router = express.Router();

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     // await Controller.create({ email: 'borrame@borrame.com' });
//     res.send("Llegamos a user");
//   })
// );

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await Controller.get();
    res.send(data);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const data = await Controller.getById(id);
    res.send(data);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      body: { name, description, place, date },
    } = req;
    await Controller.create({ name, description, place, date });
    res.send("Evento creado con éxito!!");
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log(id)
    const data = await Controller.deleteById(id);
    res.send("Evento Eliminado Correctamente")
  })
);

export default (app, entityUrl) => app.use(entityUrl, router);