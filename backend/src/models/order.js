import { db } from "../data/connection";
import { v4 as uuid } from 'uuid';

export const orderModel = {
  async insertOrderData(userId, shippingDetails, orderPrice, shippingPrice) {
    const { zip, city, street, countryId, lastName, phoneNumber, firstName, additionalAddress} = shippingDetails;
    const orderId = uuid();
    const SQLinsertQuery = `
      INSERT INTO \`order\` 
        (id, user_id, order_price, shipping_price, zip_code, city, street, country_id, last_name, phone_number, first_name, additional_address)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    let insertedValues = [orderId, userId, orderPrice, shippingPrice, zip, city, street, countryId, lastName, phoneNumber, firstName, additionalAddress];

    await db.query(SQLinsertQuery, insertedValues);

    const insertedOrder = await db.query('SELECT * FROM `order` WHERE id=?;', [orderId]);

    return insertedOrder.results[0];
  },

  async insertOrderItemData(orderId, cartItem) {
    const insertOrderItemResult = await db.query(
      'INSERT INTO orderItem (order_id, product_id, quantity) VALUES (?,?,?);',
      [orderId, cartItem.product_id, cartItem.quantity]
    );
    return insertOrderItemResult.results.insertId;
  },

  async selectOrderData(orderId) {
    // TODO: ez igy jo?
    let orderData = {};
    const orderDetails = await db.query(
      `SELECT o.*, c.name AS country
        FROM \`order\` AS o
        INNER JOIN country AS c ON o.country_id=c.id
        WHERE o.id=?;`,
      [orderId]
    );
    const orderItem = await db.query(
      `SELECT oi.quantity, p.name, p.price, p.image_path
        FROM orderItem AS oi
        INNER JOIN product AS p ON oi.product_id=p.id
        WHERE oi.order_id=?;`,
      [orderId]
    );
    orderData.orderDetails = orderDetails.results[0];
    orderData.orderItems = orderItem.results;
    return orderData;
  }
}
