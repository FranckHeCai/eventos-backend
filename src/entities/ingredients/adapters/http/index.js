import express from "express";
import Controller from "../../controller";
import { asyncHandler } from "@Application/middlewares/error-handler";
// Para operaciones con acceso restringido, introduciremos un segundo parámetro que será la variable restrictedAccess
import restrictedAccess from "@Application/middlewares/restricted-access";
import {where} from 'sequelize';

const router = express.Router();

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     // await Controller.create({ email: 'borrame@borrame.com' });
//     res.send("Llegamos a user");
//   })
// );
router.get(
  "/:ingredientId",
  async (req, res) => {
    const { 
      params : {ingredientId}
     } = req;

    try {
      const ingredient = await Controller.getById(ingredientId)
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).send("Error fetching events.");
    }
  }
);

router.delete("/",
  asyncHandler(async (req,res) => {
    const {id} = req.body
    await Controller.deleteById(id)
    res.send("Ingrediente borrado correctamente")
  })
)

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
      body: { name },
    } = req;
    await Controller.create({ name });
    res.send("Ingrediente registrado con éxito!!");
  })
);

export default (app, entityUrl) => app.use(entityUrl, router);