import { db } from '../data/connection';

export const productModel = {
  async selectAllProduct() {
    const allProductData = await db.query('SELECT id, name, price, image_path, description, type FROM merchandise;', []);
    return allProductData.results;
  },

  async selectProduct(productId) {
    const ProductData = await db.query('SELECT id, name, price, image_path, description, type FROM merchandise WHERE id=?;', [productId]);
    return ProductData.results[0];
  }
};
