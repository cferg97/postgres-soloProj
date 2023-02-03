import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import productsModel from "../Products/model.js";
import usersModel from "../Users/model.js";
import reviewsModel from "./model.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/:productId", async (req, res, next) => {
  try {
    const { reviewId } = await reviewsModel.create({
      ...req.body,
      productId: req.params.productId,
    });
    res.status(201).send({ id: reviewId });
  } catch (err) {
    next(err);
  }
});

reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const review = await reviewsModel.findByPk(req.params.reviewId, {
      include: [
        {
          model: productsModel,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: usersModel,
          attributes: ["firstName", "lastName"],
          through: { attributes: [] },
        },
      ],
    });
  } catch (err) {
    next(err);
  }
});

export default reviewsRouter;
