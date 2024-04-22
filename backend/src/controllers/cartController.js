import logger from "../logger";
import { cartService } from "../services/cartService";
import { ValidationError } from "../errors/validationError";

export const cartController = {
  async getCartData(req, res) {
    try {
      const cartData = await cartService.getCartResult(req.params.cartId);
      res.status(200).json(cartData);
    } catch (error) {
      logger.error(`Cannot retrieve cart data due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async addItemToCart(req, res) {
    try {
      const addToCartData = await cartService.addItemToCart(req.params.cartId, req.body.productId);
      res.status(200).json(addToCartData);
    } catch (error) {
      logger.error(`Cannot add item to cart due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async addItemsToCart(req, res) {
    try {
      const addToCartData = await cartService.addItemsToCart(req.params.cartId, req.body.productId, req.body.quantity);
      res.status(200).json(addToCartData);
    } catch (error) {
      logger.error(`Cannot add items to cart due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async removeFromCart(req, res) {
    try {
      await cartService.removeItemFromCart(req.params);
      res.status(200).json('Item was deleted.');
    } catch (error) {
      logger.error(`Cannot remove item from cart due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async removeAllFromCart(req, res) {
    try {
      await cartService.removeItemsFromCart(req.params);
      res.status(200).json('Items are deleted.');
    } catch (error) {
      logger.error(`Cannot remove items from cart due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async emptyCart(req, res) {
    try {
      await cartService.removeAllItemsFromCart(req.params.cartId);
      res.status(200).json('Cart is empty');
    } catch (error) {
      logger.error(`Cannot empty cart due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  }
};
