import express from "express";
import Controller from "../../controller";
import { asyncHandler } from "@Application/middlewares/error-handler";
// Para operaciones con acceso restringido, introduciremos un segundo parámetro que será la variable restrictedAccess
import restrictedAccess from "@Application/middlewares/restricted-access";
import { where } from "sequelize";

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
    const {
      body: { ingredientId, eventId, quantity },
    } = req;
    await Controller.create({ ingredientId, eventId, quantity });
    res.send(`el ingrediente con id ${ingredientId} se ha apuntado al evento: ${eventId}`);
  })
);

router.put(
  "/updateIngredient",
  asyncHandler(async (req, res) => {
    const {
      body: { ingredientId, eventId, quantity },
    } = req;
    await Controller.updateByIngredientId(ingredientId, eventId, {ingredientId, eventId, quantity});
    res.send(`el ingrediente con id ${ingredientId} se ha actualizado correctamente`);
  })
);

router.post(
  "/addIngredient",
  asyncHandler(async (req, res) => {
    const {
      body: {ingredientId, eventId}
    } = req

    try {
      await Controller.create({ ingredientId, eventId });
      res.status(201).send("Ingrediente agregado con éxito!!")
    } catch (error) {
      res.status(401).send("Error agregando ingrediente")
    }
  })
);

export default (app, entityUrl) => app.use(entityUrl, router);