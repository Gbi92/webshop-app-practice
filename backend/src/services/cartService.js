import { cartModel } from "../models/cart";

export const cartService = {
  // TODO: validations
  async getCartResult(cartId) {
    const data = await cartModel.selectCartData(cartId);

    return data;
  },

  async addItemToCart(cartId, productId) {
    return cartModel.insertItemData(cartId, productId);
  },

  async addItemsToCart(cartId, productId, quantity) {
    const addedItems = [];
    for (let i = 0; i < quantity; i++) {
      const saved = await cartModel.insertItemData(cartId, productId);
      addedItems.push(saved);
    }
    return addedItems;
  },

  // TODO: error handling -- check if affectedRows > 0
  async removeItemFromCart({ cartId, itemId }) {
    return cartModel.deleteItem(cartId, itemId);
  },

  async removeItemsFromCart({ cartId, itemId }) {
    return cartModel.deleteItems(cartId, itemId);
  },

  async removeAllItemsFromCart(cartId) {
    return cartModel.deleteAllItems(cartId);
  }
}