import { cartService } from "../services/cartService";

export const cartController = {
  async getCartData(req, res) {
    try {
      const cartData = await cartService.getCartResult(req.params.cartId);
      res.status(200).json(cartData);
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async addItemToCart(req, res) {
    try {
      const addToCartData = await cartService.addItemToCart(req.params.cartId, req.body.productId);
      res.status(200).json(addToCartData);
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  },

  async addItemsToCart(req, res) {
    try {
      const addToCartData = await cartService.addItemsToCart(req.params.cartId, req.body.productId, req.body.quantity);
      res.status(200).json(addToCartData);
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