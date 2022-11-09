const { client } = require("./client");

async function createOrderItem({ cartId, productId, quantity = 1, price }) {
  const {
    rows: [orderItem],
  } = await client.query(
    `
      INSERT INTO "orderItems"("cartId", "productId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    [cartId, productId, quantity, price]
  );

  return orderItem;
}

async function getOrderItemById(id) {
  try {
    const {
      rows: [orderItems],
    } = await client.query(
      `
    SELECT * 
    FROM "orderItems"
    WHERE id = $1;
    `,
      [id]
    );

    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemByCartId(cartId) {
  try {
    const { rows: orderItems } = await client.query(
      `
    SELECT * 
    FROM "orderItems"
    WHERE "cartId" = $1;
    `,
      [cartId]
    );

    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function addItemToCart(cartId, productId, quantity, price, image_url) {
  try {
    const { rows: orderItems } = await client.query(
      `
       INSERT INTO "orderItems"("cartId", "productId", quantity, price, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *;
     `,
      [cartId, productId, quantity, price, image_url]
    );

    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function updateOrderItem(id, quantity) {
  try {
    await client.query(`
      UPDATE "orderItems"
      SET quantity = ${quantity}
      WHERE id = ${id}
      RETURNING *;
      `);
    const test = await getOrderItemById(id);
    return test;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderItem(id) {
  try {
    const {
      rows: [orderItem],
    } = await client.query(
      `
    DELETE 
    FROM "orderItems"
    WHERE "orderItems".id = $1
    RETURNING *
    `,
      [id]
    );

    return orderItem;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrderItem,
  getOrderItemById,
  addItemToCart,
  updateOrderItem,
  destroyOrderItem,
  getOrderItemByCartId,
};
