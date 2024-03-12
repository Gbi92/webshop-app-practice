import { cartModel } from "../models/cart";

export const cartService = {
  async getCartResult(cartId) {
    // TODO: validate cartId
    let data = await cartModel.selectCartData(cartId);

    return data;
  },

  async addItemToCart(cartData) {
    // TODO: validate productId
    return cartModel.insertItemData(cartData.cartId, cartData.productId);
  }
}