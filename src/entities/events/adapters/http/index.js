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
      body: { name, description, place, date },
    } = req;
    await Controller.create({ name, description, place, date });
    res.send("Evento creado con éxito!!");
  })
);

router.get(
  "/participants/:eventId",
  asyncHandler(async (req, res) => {
    const {
      params: {eventId}
    } = req

    try {
      const participants = await Controller.getParticipants(eventId)

      res.status(201).json(participants)
    } catch (error) {
      res.status(401).send("Error getting the participants")
    }
  })
);



export default (app, entityUrl) => app.use(entityUrl, router);