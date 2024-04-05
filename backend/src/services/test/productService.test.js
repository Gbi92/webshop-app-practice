import { productModel } from "../../models/product";
import { productService } from "../productService";

jest.mock("../../models/product.js");

describe('ProductService', () => {
  test('should throw validation error when productId is not a number', async () => {
    expect.assertions(2);

    const productId = 'abc'

    try {
      await productService.getProductResult(productId);
    } catch (e) {
      expect(e.message).toEqual('Product ID should be a number');
      expect(e.statusCode).toEqual(400);
    }
  });

  test('should throw validation error when product does not exist', async () => {
    expect.assertions(3);

    const productId = 200;

    productModel.selectProduct.mockResolvedValue([]);

    try {
      await productService.getProductResult(productId);
    } catch (e) {
      expect(e.message).toEqual(`No product with id ${productId}`);
      expect(e.statusCode).toEqual(404);
      expect(productModel.selectProduct).toHaveBeenCalledWith(productId);
    }
  });

  test('should return product for provided productId', async () => {
    const productId = 2;

    const response = [{
      id: 2,
      name: "Lorem Ipsum",
      price: 21,
      image_path: "lorem-ipsum.jpg",
      description: "lorem ipsum",
      type: "lorem ipsum"
    }];

    productModel.selectProduct.mockResolvedValue(response)
    await productService.getProductResult(productId);
    expect(productModel.selectProduct).toHaveBeenCalledWith(productId);
  });
})
