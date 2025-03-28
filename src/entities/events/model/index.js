import GenericModel from "@Application/repository/generic-model";
import Schema from "./schema";
import UserSchema from "entities/user/model/schema";
import UserEventSchema from "entities/userEvent/model/schema"

Schema.belongsToMany(UserSchema, {
  through: UserEventSchema,
  foreignKey: "eventId"
})

const Model = {
  ...GenericModel(Schema),
  getByEmail: (email) => Schema.findOne({ where: { email } }),
  getParticipants: async (eventId) => {
    const event = await Schema.findByPk(eventId, {
      include: {
        model: UserSchema,
        through: { attributes: [] }, // Exclude join table attributes
      },
    });
    return event ? event.users : [];
  },
};
export default Model;
