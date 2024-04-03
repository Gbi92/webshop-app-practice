import { productModel } from "../models/product";

export const productService = {
  async getAllProductResult() {
    const data = await productModel.selectAllProduct();
    return data;
  },

  async getProductResult(productId) {
    const data = await productModel.selectProduct(productId);
    return data;
  }
}
