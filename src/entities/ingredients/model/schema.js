import { db, DataTypes } from "@Application/database";

export default db.define("ingredients",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  // {
  //   freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  // }
);


