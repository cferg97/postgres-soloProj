import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import reviewsModel from "../Reviews/model.js";
import productsReviewsModel from "../productsReviewModel.js";
import catagoriesModel from "../Categories/model.js";
import productsCategoriesModel from "../productCategoryModel.js";
import usersModel from "../Users/model.js";
import usersReviewsModel from "../usersReviewModel.js";

const productsModel = sequelize.define("product", {
  productId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// these are fine

productsModel.belongsToMany(catagoriesModel, {
  through: productsCategoriesModel,
  foreignKey: { name: "productId", allowNull: false },
});

catagoriesModel.belongsToMany(productsModel, {
  through: productsCategoriesModel,
  foreignKey: { name: "categoryId", allowNull: true },
});

// above are fine

productsModel.hasMany(reviewsModel);
reviewsModel.belongsTo(productsModel);

export default productsModel;
