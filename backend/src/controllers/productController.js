import logger from '../logger';
import { productService } from '../services/productService';
import { ValidationError } from "../errors/validationError";

export const productController = {
  async getAllProductData(req, res) {
    try {
      const allProductData = await productService.getAllProductResult();
      res.status(200).json(allProductData);
    } catch (error) {
      logger.error(`Cannot retrieve products data due to: ${error.message}`);
      res.status(500).json('Internal server error');
    }
  },

  async getProductData(req, res) {
    try {
      const ProductData = await productService.getProductResult(req.params.productId);
      res.status(200).json(ProductData);
    } catch (error) {
      logger.error(`Cannot retrieve product data due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  }
};
