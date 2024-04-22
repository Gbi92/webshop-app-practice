import { productModel } from "../models/product";
import { ValidationError } from "../errors/validationError";

export const productService = {
  async getAllProductResult() {
    const data = await productModel.selectAllProduct();
    return data;
  },

  async getProductResult(productId) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(productId)) {
      throw new ValidationError('Product ID is not valid', 400);
    }

    const data = await productModel.selectProduct(productId);

    if (data.length !== 0) {
      return data[0];
    } else {
      throw new ValidationError(`No product with id ${productId}`, 404);
    }
  }
}
