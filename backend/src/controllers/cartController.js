import { cartService } from "../services/cartService";

export const cartController = {
  async getCartData(req, res) {
    try {
      let cartData = await cartService.getCartResult(req.params.cartId);
      res.status(200).json(cartData.results);
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async addToCart(req, res) {
    try {
      let addToCartData = await cartService.addItemToCart(req.params.cartId, req.body.productId);
      res.status(200).json(addToCartData.results[0]);
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async removeFromCart() {
    // TODO
  }
};