import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const usersReviewsModel = sequelize.define("userReview", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default usersReviewsModel;
