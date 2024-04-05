import { productModel } from "../models/product";
import { ValidationError } from "../validationError";

export const productService = {
  async getAllProductResult() {
    const data = await productModel.selectAllProduct();
    return data;
  },

  async getProductResult(productId) {
    if (!parseInt(productId, 10)) {
      throw new ValidationError('Product ID should be a number', 400);
    }

    const data = await productModel.selectProduct(productId);

    if (data.length !== 0) {
      return data[0];
    } else {
      throw new ValidationError(`No product with id ${productId}`, 404);
    }
  }
}
