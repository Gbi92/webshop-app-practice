import { productService } from '../services/productService';
import { ValidationError } from '../validationError';

export const productController = {
  async getAllProductData(req, res) {
    try {
      let allProductData = await productService.getAllProductResult();
      res.status(200).json(allProductData.results);
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
