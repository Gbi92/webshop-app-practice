import { db } from "../data/connection";
import { v4 as uuid } from 'uuid';
import { DatabaseError } from "../errors/databaseError";

export const orderModel = {
  async saveOrder(userId, shippingDetails, orderPrice, shippingPrice, cartItems) {
    const connection = await db.connection();
    try {
      await connection.query('START TRANSACTION');
    
      const addedOrder = await this.insertOrderData(connection, userId, shippingDetails, orderPrice, shippingPrice);

      for (let i = 0; i < cartItems.length; i++) {
        await this.insertOrderItemData(connection, addedOrder.id, cartItems[i]);
      }

      await connection.query('COMMIT');

      return addedOrder;
    } catch (error) {
      await connection.query('ROLLBACK');
      throw new DatabaseError('Order cannot be created');
    } finally {
      await connection.release();
    }
  },

  async insertOrderData(connection, userId, shippingDetails, orderPrice, shippingPrice) {
    const { zip, city, street, countryId, lastName, phoneNumber, firstName, additionalAddress} = shippingDetails;
    const orderId = uuid();
    const SQLinsertQuery = `
      INSERT INTO \`order\` 
        (id, user_id, order_price, shipping_price, zip_code, city, street, country_id, last_name, phone_number, first_name, additional_address)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    const insertedValues = [orderId, userId, orderPrice, shippingPrice, zip, city, street, countryId, lastName, phoneNumber, firstName, additionalAddress];

    await connection.query(SQLinsertQuery, insertedValues);

    const insertedOrder = await connection.query('SELECT * FROM `order` WHERE id=?;', [orderId]);

    return insertedOrder.results[0];
  },

  async insertOrderItemData(connection, orderId, cartItem) {
    const insertOrderItemResult = await connection.query(
      'INSERT INTO orderItem (order_id, product_id, quantity) VALUES (?,?,?);',
      [orderId, cartItem.product_id, cartItem.quantity]
    );
    return insertOrderItemResult.results.insertId;
  },

  async selectOrderData(orderId) {
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
  },

  async updatePendingOrder(orderId, status) {
    await db.query('UPDATE `order` SET status=?, purchase_date=CURRENT_TIMESTAMP WHERE id=? AND status="Pending"', [status, orderId]);
    const updatedOrder = await db.query('SELECT * FROM `order` WHERE id=?', [orderId]);
    return updatedOrder.results[0];
  }
}
