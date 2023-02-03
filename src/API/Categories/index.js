import express from "express";
import productsModel from "../Products/model.js";
import categoriesModel from "./model.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", async (req, res, next) => {
  try {
    const { categoryId } = await categoriesModel.create(req.body);
    res.status(201).send({ id: categoryId });
  } catch (err) {
    next(err);
  }
});

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const category = await categoriesModel.findAll({
      include: [
        {
          model: productsModel,
          attributes: ["name", "price"],
          through: { attributes: [] },
        },
      ],
    });
    res.send(category);
  } catch (err) {
    next(err);
  }
});

export default categoriesRouter;
