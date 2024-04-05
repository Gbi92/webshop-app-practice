import { db } from '../data/connection';

export const productModel = {
  async selectAllProduct() {
    const allProductData = await db.query('SELECT * FROM merchandise;', []);
    return allProductData.results;
  },

  async selectProduct(productId) {
    const productData = await db.query('SELECT * FROM merchandise WHERE id=?;', [productId]);
    return productData.results;
  }
};
