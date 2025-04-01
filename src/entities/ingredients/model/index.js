import GenericModel from "@Application/repository/generic-model";
import Schema from "./schema";
import EventSchema from "entities/events/model/schema"
import UserEventSchema from "entities/userEvent/model/schema"


Schema.belongsToMany(EventSchema, {
  through: UserEventSchema,
  foreignKey: "userId"
})

const Model = {
  ...GenericModel(Schema),
    getByEmail: (email) => Schema.findOne({ where: { email } }),
    getEvents: async (userId) => {
    const user = await Schema.findByPk(userId, {
      include: {
        model: EventSchema,
        through: { attributes: [] }, // Exclude join table attributes
      },
    });
    return user ? user.events : [];
  },
};

export default Model;
