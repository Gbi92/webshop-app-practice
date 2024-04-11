import logger from "../logger";
import { orderService } from "../services/orderService";
import { ValidationError } from "../validationError";

export const orderController = {
  async addOrder(req, res) {
    try {
      const addOrderData = await orderService.addOrder(req.headers.user_id, req.body);
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
}