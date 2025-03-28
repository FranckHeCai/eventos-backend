import { db, DataTypes } from "@Application/database";

export default db.define("user", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});
