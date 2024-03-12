import { db } from "../data/connection";

export const cartModel = {
  async selectCartData(cartId) {
    let cartData = await db.query(
      `SELECT merch.id, merch.name, merch.price, merch.image_path 
        FROM merchandise AS merch
        INNER JOIN cart ON merch.id=cart.product_id
        WHERE cart.cart_id=?;`, 
      [cartId]
    );
    return cartData;
  },

  async insertItemData(cartId, productId) {
    await db.query('INSERT INTO cart (cart_id, product_id) VALUES (?,?);', [cartId, productId]);
    let result = await db.query('SELECT cart_id, product_id FROM cart WHERE cart_id=?;', [cartId]);
    return result;
  }
};
