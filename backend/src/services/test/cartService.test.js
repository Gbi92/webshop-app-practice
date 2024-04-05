import { cartService } from "../cartService";

describe('CartService', () => {
  test('should throw validation error when cartId is not valid', async () => {
    expect.assertions(2);

    const cartId = 'cartId1'

    try {
      await cartService.getCartResult(cartId);
    } catch (e) {
      expect(e.message).toEqual('Cart ID is not valid');
      expect(e.statusCode).toEqual(400);
    }
  });

  test('should throw validation error when productId is not a number', async () => {
    expect.assertions(2);

    const cartId = 'cf3c7974-0ffa-49e7-a19f-918df07ffa2a'
    const productId = 'product'

    try {
      await cartService.addItemToCart(cartId, productId);
    } catch (e) {
      expect(e.message).toEqual('Product ID should be a number');
      expect(e.statusCode).toEqual(400);
    }
  });

  test('should throw validation error when quantity is not a number', async () => {
    expect.assertions(2);

    const cartId = 'cf3c7974-0ffa-49e7-a19f-918df07ffa2a';
    const productId = 2;
    const quantity = 'a lot';

    try {
      await cartService.addItemsToCart(cartId, productId, quantity);
    } catch (e) {
      expect(e.message).toEqual('Quantity should be a number');
      expect(e.statusCode).toEqual(400);
    }
  });
});
