import { db, DataTypes } from "@Application/database";

export default db.define("userEvent", {
  userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Name of the users table
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events", // Name of the events table
        key: "id",
      },
    },
},
{
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
}
);
