import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const reviewsModel = sequelize.define("review", {
  reviewId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      customValidator(value) {
        if (value < 1) {
          throw new Error("Cannot post a rating less than 1!");
        }
        if (value > 5) {
          throw new Error("Cannot post a rating higher than 5!");
        }
      },
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default reviewsModel;
