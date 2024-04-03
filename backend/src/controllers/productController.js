import { productService } from '../services/productService';
import { ValidationError } from '../validationError';

export const productController = {
  async getAllProductData(req, res) {
    try {
      const allProductData = await productService.getAllProductResult();
      res.status(200).json(allProductData);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        console.log(error);
        res.status(500).json('Internal server error');
      }
    }
  },

  async getProductData(req, res) {
    try {
      const ProductData = await productService.getProductResult(req.params.productId);
      res.status(200).json(ProductData);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        console.log(error);
        res.status(500).json('Internal server error');
      }
    }
  }
};
