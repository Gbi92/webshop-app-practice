import { cartModel } from "../models/cart";
import { ValidationError } from "../errors/validationError";

export const cartService = {
  async getCartResult(cartId) {
    validateParam(cartId);
    const data = await cartModel.selectCartData(cartId);
    return data;
  },

  async addItemToCart(cartId, productId) {
    validateParam(cartId, productId);
    return cartModel.insertItemData(cartId, productId);
  },

  async addItemsToCart(cartId, productId, quantity) {
    validateParam(cartId, productId);
    if (!parseInt(quantity, 10)) {
      throw new ValidationError('Quantity should be a number', 400);
    }

    const addedItems = [];
    for (let i = 0; i < quantity; i++) {
      const saved = await cartModel.insertItemData(cartId, productId);
      addedItems.push(saved);
    }

    return addedItems;
  },

  async removeItemFromCart({ cartId, itemId }) {
    validateParam(cartId, itemId);
    return cartModel.deleteItem(cartId, itemId);
  },

  async removeItemsFromCart({ cartId, itemId }) {
    validateParam(cartId, itemId);
    return cartModel.deleteItems(cartId, itemId);
  },

  async removeAllItemsFromCart(cartId) {
    validateParam(cartId);
    return cartModel.deleteAllItems(cartId);
  }
};

function validateParam(cartId, productId) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(cartId)) {
    throw new ValidationError('Cart ID is not valid', 400);
  }

  if (productId && !uuidRegex.test(productId)) {
    throw new ValidationError('Product ID is not valid', 400);
  }
}
