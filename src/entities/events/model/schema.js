import { db, DataTypes } from "@Application/database";
import Model from "entities/user/model";

export default db.define("event", {
  name: DataTypes.STRING,
  place: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.DATEONLY
});

