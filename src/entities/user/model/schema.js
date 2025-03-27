import { db, DataTypes } from "@Application/database";

export default db.define("user", {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  auth0Id: DataTypes.STRING,
  password: DataTypes.STRING
});
