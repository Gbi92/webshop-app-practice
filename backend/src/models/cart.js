import { db } from "../data/connection";

export const cartModel = {
  async selectCartData(cartId) {
    const cartData = await db.query(
      `SELECT p.id, p.name, p.price, p.image_path 
        FROM product AS p
        INNER JOIN cart ON p.id=cart.product_id
        WHERE cart.cart_id=?;`, 
      [cartId]
    );
    return cartData.results;
  },

  async selectCartProducts(cartId) {
    const cartData = await db.query(
      `SELECT p.id AS product_id, SUM(p.price) AS total_price, COUNT(*) AS quantity
        FROM product AS p
        INNER JOIN cart ON p.id=cart.product_id
        WHERE cart.cart_id=?
        GROUP BY p.id;`, 
      [cartId]
    );
    return cartData.results;
  },

  async insertItemData(cartId, productId) {
    // TODO: transaction?
    await db.query('INSERT INTO cart (cart_id, product_id) VALUES (?,?);', [cartId, productId]);
    const result = await db.query(
      `SELECT p.*, c.created_at 
        FROM cart AS c
        INNER JOIN product AS p ON p.id=c.product_id
        WHERE c.cart_id=?;`,
      [cartId]
    );
    return result.results[0];
  },

  async deleteItem(cartId, itemId) {
    const removeCartItem = await db.query('DELETE FROM cart WHERE cart_id=? AND product_id=? LIMIT 1', [cartId, itemId]);
    return removeCartItem;
  },

  async deleteItems(cartId, itemId) {
    const removeCartItems = await db.query('DELETE FROM cart WHERE cart_id=? AND product_id=?', [cartId, itemId]);
    return removeCartItems;
  },

  async deleteAllItems(cartId) {
    const removeAllCartItems = await db.query('DELETE FROM cart WHERE cart_id=?', [cartId]);
    return removeAllCartItems;
  },
};
