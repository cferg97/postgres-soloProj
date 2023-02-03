import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const catagoriesModel = sequelize.define("category", {
  categoryId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default catagoriesModel;
