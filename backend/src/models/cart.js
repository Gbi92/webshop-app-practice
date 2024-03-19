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
    return cartData;
  },

  async insertItemData(cartId, productId) {
    const insertedResult = await db.query('INSERT INTO cart (cart_id, product_id) VALUES (?,?);', [cartId, productId]);
    const result = await db.query('SELECT * FROM cart WHERE id=?;', [insertedResult.results.insertId]);
    return result;
  }
};
