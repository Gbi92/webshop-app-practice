import logger from "../logger";
import { orderService } from "../services/orderService";
import { ValidationError } from "../errors/validationError";

export const orderController = {
  async addOrder(req, res) {
    try {
      const addOrderData = await orderService.addOrder(req.headers.userInfo.userId, req.body);
      res.status(200).json(addOrderData);
    } catch (error) {
      logger.error(`Cannot add order due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async getOrder(req, res) {
    try {
      const orderData = await orderService.getOrder(req.params.orderId);
      res.status(200).json(orderData);
    } catch (error) {
      logger.error(`Cannot retrieve order data due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async finalizeOrder(req, res) {
    try {
      const updatedOrderData = await orderService.finalizeOrder(req.params.orderId, req.body.status);
      res.status(200).json(updatedOrderData);
    } catch (error) {
      logger.error(`Cannot update order status due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  }
}
