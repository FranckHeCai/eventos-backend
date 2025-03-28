import { db, DataTypes } from "@Application/database";

export default db.define("event", {
  name: DataTypes.STRING,
  place: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.DATEONLY
});
