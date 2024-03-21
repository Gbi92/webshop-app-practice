import { cartService } from "../services/cartService";

export const cartController = {
  async getCartData(req, res) {
    try {
      const cartData = await cartService.getCartResult(req.params.cartId);
      res.status(200).json(cartData.results);
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async addToCart(req, res) {
    try {
      const addToCartData = await cartService.addItemToCart(req.params.cartId, req.body.productId);
      res.status(200).json(addToCartData.results[0]);
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async removeFromCart(req, res) {
    try {
      await cartService.removeItemFromCart(req.params);
      res.status(200).json('Item was deleted.');
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async removeAllFromCart(req, res) {
    try {
      await cartService.removeItemsFromCart(req.params);
      res.status(200).json('Items are deleted.');
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async emptyCart(req, res) {
    try {
      await cartService.removeAllItemsFromCart(req.params.cartId);
      res.status(200).json('Cart is empty');
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  }
};