import { db, DataTypes } from "@Application/database";

export default db.define("users", 
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    auth0Id: DataTypes.STRING,
    password: DataTypes.STRING
  },
  // {
  //     freezeTableName: true, // Esto desactiva la pluralización automática
  // }
);
