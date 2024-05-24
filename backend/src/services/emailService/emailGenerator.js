export const emailGenerator = {
  verificationTemplate(userName, url) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Email</title>
      </head>
      <body>
        <h1 style="margin: 10px auto;">Welcome to Friendly Coffee!</h1>
        <h2>Dear ${userName},</h2>
        <p>Thank you for registering on our site!</p>
        <div>
          <p>Please verify your email address by clicking on the link below.</p>
          <a href="${url}" style="color: #54d4bc;">Click here to verify!</a>
        </div>
        <p>-The Friendly Coffee Team</p>
      </body>
      </html>
    `;
  },

  orderDetailsTemplate({ orderDetails, orderItems }) {
    const shippingAddress = `
      ${orderDetails.country}, ${orderDetails.zip_code} ${orderDetails.city}, ${orderDetails.street} ${orderDetails.additional_address || ''}
    `;

    let orderItemRows = '';

    for (let i = 0; i < orderItems.length; i++) {
      orderItemRows += `
          <tr>
            <th scope="row">${orderItems[i].name}</th>
            <td>${orderItems[i].quantity}</td>
            <td>${orderItems[i].price}</td>
          </tr>
          `
    }

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Email</title>
        <style>
          table {
            border-collapse: collapse;
            border: 2px solid rgb(140 140 140);
            font-family: sans-serif;
            font-size: 0.8rem;
            letter-spacing: 1px;
          }
          
          thead,
          tfoot {
            background-color: #D69482;
          }
          
          th,
          td {
            border: 1px solid rgb(160 160 160);
            padding: 8px 10px;
          }
          
          td:last-of-type {
            text-align: center;
          }
          
          tfoot th {
            text-align: right;
          }
          
          tfoot td {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <p>Dear ${orderDetails.first_name || ''} ${orderDetails.last_name},</p>
        <p>Thank you for your order!</p>
        <div>
          <h2>Order details</h2>
          <p>Order number: <strong>${orderDetails.id}</strong> (${orderDetails.purchase_date.toLocaleString()})</p>
          <p>Shipping address:${shippingAddress}</p>
          <table>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemRows}
              <tr>
                <th scope="row" colspan="2">Subtotal</th>
                <td>${orderDetails.order_price}</td>
              </tr>
              <tr>
                <th scope="row" colspan="2">Shipping</th>
                <td>${orderDetails.shipping_price}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colspan="2">Total price</th>
                <td>${orderDetails.order_price + orderDetails.shipping_price}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p>-The Friendly Coffee Team</p>
      </body>
      </html>
    `;
  }
};
