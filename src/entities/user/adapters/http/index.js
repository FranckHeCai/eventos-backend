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
  "/events/:userId",
  async (req, res) => {
    const { 
      params : {userId}
     } = req;

    try {
      const events = await Controller.getEvents(userId)
      res.status(200).json(events);
    } catch (error) {
      res.status(500).send("Error fetching events.");
    }
  }
);

router.delete("/",
  asyncHandler(async (req,res) => {
    const {id} = req.body
    await Controller.deleteById(id)
    res.send("Usuario borrado correctamente")
  })
)

router.put("/", 
  asyncHandler(async (req, res) => {
    const {id, username} = req.body
    await Controller.updateById(id, {username})
    res.send("usuario actualizado")
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
      body: { email, username, password },
    } = req;
    const newUser = await Controller.create({ email, username, password });
    res.send("Usuario creado con éxito!!");
    res.status(201).json({
        message: "Usuario creado con éxito!!",
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        },
      })
  })
);

export default (app, entityUrl) => app.use(entityUrl, router);