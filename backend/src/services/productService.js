import { productModel } from "../models/product";

export const productService = {
  async getAllProductResult() {
    let data = await productModel.selectAllProduct();

    return data;
  }
}
