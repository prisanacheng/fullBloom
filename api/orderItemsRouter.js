const express = require("express");
const {
  createOrderItem,
  updateOrderItem,
  destroyOrderItem,
  getOrderItemByCartId,
} = require("../db");
const router = express.Router();

router.post("/:cartId/addToCart", async (req, res, next) => {
  const { cartId } = req.params;
  const { productId, name, quantity, price, image_url } = req.body;
  const itemData = {};
  try {
    itemData.cartId = cartId;
    itemData.productId = productId;
    itemData.name = name;
    itemData.quantity = quantity;
    itemData.price = price;
    itemData.image_url = image_url;
    const orderItem = await createOrderItem(itemData);
    res.send(orderItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.patch("/:orderItemId", async (req, res, next) => {
  const { orderItemId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedQuantity = await updateOrderItem(orderItemId, quantity);
    res.send(updatedQuantity);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.delete("/:orderItemId", async (req, res, next) => {
  const { orderItemId } = req.params;

  try {
    const destroyedItem = await destroyOrderItem(orderItemId);
    res.send(destroyedItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get("/:cartId", async (req, res, next) => {
  let { cartId } = req.params;
  try {
    const orderItem = await getOrderItemByCartId(cartId);
    res.send(orderItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
