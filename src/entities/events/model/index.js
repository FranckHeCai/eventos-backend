import GenericModel from "@Application/repository/generic-model";
import Schema from "./schema";
import UserSchema from "entities/user/model/schema";
import UserEventSchema from "entities/userEvent/model/schema"
import EventIngredientSchema from "entities/eventIngredient/model/schema"
import ingredientSchema from "entities/ingredients/model/schema"

Schema.belongsToMany(UserSchema, {
  through: UserEventSchema,
  foreignKey: "eventId"
})

Schema.belongsToMany(ingredientSchema, {
  through: EventIngredientSchema,
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
  getIngredients: async (eventId) => {
    const ingredients = await Schema.findByPk(eventId, {
      include: {
        model: ingredientSchema,
        through: { attributes: [] }, // Exclude join table attributes
      },
    });
    return ingredients ? ingredients.ingredients : [];
  },
};
export default Model;
