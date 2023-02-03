import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import productsCategoriesModel from "../productCategoryModel.js";
import reviewsModel from "../Reviews/model.js";
import productsModel from "./model.js";
import catagoriesModel from "../Categories/model.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.name) {
      query.name = { [Op.iLike]: `%${req.query.name}%` };
    }
    if (req.query.priceMax) {
      query.price = { [Op.lte]: `${req.query.priceMax}` };
    }
    if (req.query.priceMin && req.query.priceMax) {
      query.price = {
        [Op.between]: [
          `${parseFloat(req.query.priceMin).toFixed(2)}`,
          `${parseFloat(req.query.priceMax).toFixed(2)}`,
        ],
      };
    }

    const products = await productsModel.findAll({
      where: { ...query },
      attributes: [
        "productId",
        "name",
        "brand",
        "description",
        "price",
        "imageUrl",
      ],
      include: [
        {
          model: catagoriesModel,
          attributes: ["name"],
          through: { attributes: [] },
        },
        // {
        //   model: reviewsModel,
        //   attributes: ["rate", "comment"],
        //   through: { attributes: [] },
        // },
      ],
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const { productId } = await productsModel.create(req.body);
    if (req.body.categories) {
      await productsCategoriesModel.bulkCreate(
        req.body.categories.map((category) => {
          return {
            categoryId: category,
            productId,
          };
        })
      );
    }
    res.status(201).send({ id: productId });
  } catch (err) {
    next(err);
  }
});

productsRouter.put("/:productid/category", async (req, res, next) => {
  try {
    const { productId } = await productsCategoriesModel.create({
      productId: req.params.productid,
      categoryId: req.body.categories,
    });
    res.status(201).send({ id: productId });
  } catch (err) {
    next(err);
  }
});

export default productsRouter;
