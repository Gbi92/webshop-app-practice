import { cartModel } from "../models/cart";
import { orderModel } from "../models/order";
import { shippingModel } from "../models/shipping";

export const orderService = {
  async addOrder(userId, orderInfo) {
    //TODO: validate
    const cartItems = await cartModel.selectCartProducts(orderInfo.cartId);
    // TODO: validate if there's cartId
    const orderPrice = cartItems.reduce((acc, curr) => acc + curr.total_price, 0);

    // TODO: transaction
    const shippingInfo = await shippingModel.selectShippingData(orderInfo.shippingDetails.countryId);

    const addedOrder = await orderModel.insertOrderData(userId, orderInfo.shippingDetails, orderPrice, shippingInfo.cost);

    for (let i = 0; i < cartItems.length; i++) {
      await orderModel.insertOrderItemData(addedOrder.id, cartItems[i]);
    }

    await cartModel.deleteAllItems(orderInfo.cartId);

    return addedOrder;
  },
}
