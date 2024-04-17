import { db } from "../data/connection";
import { v4 as uuid } from 'uuid';

export const orderModel = {
  async insertOrderData(userId, shippingDetails, orderPrice, shippingPrice) {
    const { zip, city, street, countryId, lastName, phoneNumber} = shippingDetails;
    const orderId = uuid();
    let insertedValues = [orderId, userId, orderPrice, shippingPrice, zip, city, street, countryId, lastName, phoneNumber];
    
    if (shippingDetails.firstName !== undefined) {
      insertedValues.push(shippingDetails.firstName);
    }
    if (shippingDetails.additionalAddress !== undefined) {
      insertedValues.push(shippingDetails.additionalAddress);
    }

    await db.query(
      SQLinsert(shippingDetails),
      insertedValues
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

function SQLinsert(shippingDetails) {
  let SQLinsertQuery = 'INSERT INTO `order` (id, user_id, order_price, shipping_price, zip_code, city, street, country_id, last_name, phone_number';
  if (shippingDetails.firstName !== undefined) {
    SQLinsertQuery += ', first_name';
  }

  if (shippingDetails.additionalAddress !== undefined) {
    SQLinsertQuery += ', additional_address';
  }

  SQLinsertQuery += ') VALUES (';

  for (let i = 0; i < Object.keys(shippingDetails).length; i++) {
    SQLinsertQuery += '?,';
  }

  return SQLinsertQuery += '?,?,?,?)';
}
