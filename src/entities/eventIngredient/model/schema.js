import { db, DataTypes } from "@Application/database";

export default db.define("eventIngredient",
  {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ingredients",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER, // You can use INTEGER if you prefer numeric quantities
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);
