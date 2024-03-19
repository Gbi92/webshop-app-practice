import { cartModel } from "../models/cart";

export const cartService = {
  async getCartResult(cartId) {
    // TODO: validate cartId
    let data = await cartModel.selectCartData(cartId);

    return data;
  },

  async addItemToCart(cartId, productId) {
    // TODO: validate productId
    return cartModel.insertItemData(cartId, productId);
  }
}