import GenericModel from "@Application/repository/generic-model";
import Schema from "./schema";
import EventSchema from "entities/events/model/schema"
import UserEventSchema from "entities/userEvent/model/schema"
import eventIngredientSchema from "entities/eventIngredient/model/schema"


Schema.belongsToMany(EventSchema, {
  through: eventIngredientSchema,
  foreignKey: "ingredientId"
})

const Model = {
  ...GenericModel(Schema),
    getByEmail: (email) => Schema.findOne({ where: { email } }),
};

export default Model;
