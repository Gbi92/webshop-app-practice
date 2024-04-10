import { db } from "../data/connection";

export const cartModel = {
  async selectCartData(cartId) {
    const cartData = await db.query(
      `SELECT merch.id, merch.name, merch.price, merch.image_path 
        FROM merchandise AS merch
        INNER JOIN cart ON merch.id=cart.product_id
        WHERE cart.cart_id=?;`, 
      [cartId]
    );
    return cartData.results;
  },

  async selectCartProducts(cartId) {
    const cartData = await db.query(
      `SELECT merch.id AS product_id, SUM(merch.price) AS total_price, COUNT(*) AS quantity
        FROM merchandise AS merch
        INNER JOIN cart ON merch.id=cart.product_id
        WHERE cart.cart_id=?
        GROUP BY merch.id;`, 
      [cartId]
    );
    return cartData.results;
  },

  async insertItemData(cartId, productId) {
    const insertedResult = await db.query('INSERT INTO cart (cart_id, product_id) VALUES (?,?);', [cartId, productId]);
    const result = await db.query(
      `SELECT m.*, c.created_at 
        FROM cart AS c
        INNER JOIN merchandise AS m ON m.id=c.product_id
        WHERE c.id=?;`, 
      [insertedResult.results.insertId]
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
