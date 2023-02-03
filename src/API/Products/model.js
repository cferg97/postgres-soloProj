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

productsModel.belongsToMany(catagoriesModel, {
  through: productsCategoriesModel,
  foreignKey: { name: "productId", allowNull: false },
});

catagoriesModel.belongsToMany(productsModel, {
  through: productsCategoriesModel,
  foreignKey: { name: "categoryId", allowNull: false },
});

productsModel.belongsToMany(reviewsModel, {
  through: productsReviewsModel,
  foreignKey: { name: "productId", allowNull: false },
});

reviewsModel.belongsToMany(productsModel, {
  through: productsReviewsModel,
  foreignKey: { name: "reviewId", allowNull: false },
});

reviewsModel.belongsTo(usersModel, {
  through: usersReviewsModel,
  foreignKey: { name: "reviewId", allowNull: false },
});

usersModel.belongsToMany(reviewsModel, {
  through: usersReviewsModel,
  foreignKey: { name: "userId", allowNull: false },
});

export default productsModel;
