import { cartModel } from "../models/cart";
import { orderModel } from "../models/order";
import { shippingModel } from "../models/shipping";
import { ValidationError } from "../validationError";

export const orderService = {
  async addOrder(userId, orderInfo) {
    //TODO: validate
    const cartItems = await cartModel.selectCartProducts(orderInfo.cartId);
    if (cartItems.length === 0) {
      throw new ValidationError('Cart is empty', 400);
    }

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
