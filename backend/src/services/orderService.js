import { cartModel } from "../models/cart";
import { orderModel } from "../models/order";
import { shippingModel } from "../models/shipping";
import { ValidationError } from "../errors/validationError";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const orderService = {
  async addOrder(userId, orderInfo) {
    validateInput(orderInfo);
    const cartItems = await cartModel.selectCartProducts(orderInfo.cartId);
    if (cartItems.length === 0) {
      throw new ValidationError('Cart is empty', 400);
    }
    const orderPrice = cartItems.reduce((acc, curr) => acc + curr.total_price, 0);
    const shippingInfo = await shippingModel.selectShippingData(orderInfo.shippingDetails.countryId);
    if (!shippingInfo) {
      throw new ValidationError('Country ID cannot be found', 400);
    }

    const addedOrder = await orderModel.saveOrder(userId, orderInfo.shippingDetails, orderPrice, shippingInfo.cost, cartItems);

    return addedOrder;
  },

  async getOrder(orderId) {
    if (!uuidRegex.test(orderId)) {
      throw new ValidationError('Order ID is not valid', 400);
    }
    const data = await orderModel.selectOrderData(orderId);
    return data;
  },

  async updateOrderStatus(orderId) {
    if (!uuidRegex.test(orderId)) {
      throw new ValidationError('Order ID is not valid', 400);
    }
    const updatedOrder = await orderModel.updatePendingOrder(orderId);
    if (!updatedOrder) {
      throw new ValidationError('Order ID cannot be found', 404);
    }
    return updatedOrder;
  }
};

function validateInput(input) {
  if (!input.shippingDetails.zip) {
    throw new ValidationError('ZIP is required', 400);
  }

  if (!input.shippingDetails.city) {
    throw new ValidationError('City is required', 400);
  }

  if (!input.shippingDetails.street) {
    throw new ValidationError('Street is required', 400);
  }

  if (!input.shippingDetails.countryId) {
    throw new ValidationError('Country ID is required', 400);
  }

  if (!input.shippingDetails.lastName) {
    throw new ValidationError('Last name is required', 400);
  }

  if (!input.shippingDetails.phoneNumber) {
    throw new ValidationError('Phone number is required', 400);
  }

  if (!uuidRegex.test(input.cartId)) {
    throw new ValidationError('Cart ID is not valid', 400);
  }
}
