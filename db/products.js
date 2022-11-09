const { client } = require("./client");

async function createProduct({
  name,
  description,
  price,
  categoryId,
  image_url,
  inStock = true,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO products(name, description, price, "categoryId", image_url, "inStock")
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
      [name, description, price, categoryId, image_url, inStock]
    );

    return product;
  } catch (error) {
    console.error("Failed to create product!");
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE id=$1;
    `,
      [id]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(
      `SELECT *
       FROM products;
      `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategoryId(id) {
  try {
    const { rows: products } = await client.query(`
      SELECT *
      FROM products
      JOIN categories ON categories.id=products."categoryId"
      WHERE categories.id=${id}
      `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
          UPDATE products
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
        Object.values(fields)
      );
      return await getProductById(id);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  getProductsByCategoryId,
  updateProduct,
};
