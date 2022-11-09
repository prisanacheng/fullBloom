const express = require("express");
const { createHistory, getOrderHistoryByUserId } = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/:userId", requireUser, async (req, res, next) => {
  let { userId } = req.params;
  try {
    const orderHistory = await getOrderHistoryByUserId(userId);
    res.send(orderHistory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.post("/:cartId/addToOrder", async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const orderHistory = await createHistory({ cartId });
    res.send(orderHistory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
