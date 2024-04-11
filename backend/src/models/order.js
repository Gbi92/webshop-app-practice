import { db } from "../data/connection";
import { v4 as uuid } from 'uuid';

export const orderModel = {
  async insertOrderData(userId, shippingDetails, orderPrice, shippingPrice) {
    const { zip, city, street, countryId} = shippingDetails;
    const orderId = uuid();
    await db.query(
      'INSERT INTO `order` (id, user_id, zip_code, city, street, country_id, order_price, shipping_price) VALUES (?,?,?,?,?,?,?,?)',
      [orderId, userId, zip, city, street, countryId, orderPrice, shippingPrice]
    );
    const insertedOrder = await db.query('SELECT * FROM `order` WHERE id=?', [orderId]);
    return insertedOrder.results[0];
  },

  async insertOrderItemData(orderId, cartItem) {
    const insertOrderItemResult = await db.query(
      'INSERT INTO orderItem (order_id, product_id, quantity) VALUES (?,?,?)',
      [orderId, cartItem.product_id, cartItem.quantity]
    );
    return insertOrderItemResult.results.insertId;
  }
}
