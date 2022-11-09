const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
} = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (!productId) {
      res.send({
        error: "product error",
        message: `Product ${req.params.productId} not found`,
        name: "product error",
      });
    }

    const products = await getProductById(productId);

    res.send({ products });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:categoryId/products", async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const product = await getProductsByCategoryId(categoryId);
    if (!product.length) {
      next({
        name: "CategoryDoesn'tExistError",
        message: `Category ${categoryId} not found`,
      });
    } else {
      res.send(product);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;
