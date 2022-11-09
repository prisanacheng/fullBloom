async function mapProducts(carts) {
  const object = {};
  for (let row of carts) {
    if (!object.isPurchased) {
      object.isPurchased = row.isPurchased;
    }
    if (!object.cartId) {
      object.cartId = row.cartId;
    }
    if (!object.products) {
      object.products = [];
    }
    object.products.push({
      id: row.productId,
      quantity: row.quantity,
      price: row.price,
      name: row.name,
      description: row.description,
      image_url: row.image_url,
      inStock: row.inStock,
    });
  }
  return object;
}

module.exports = {
  mapProducts,
};
