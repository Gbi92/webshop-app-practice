import request from "supertest";

import app from '../../app';
import { productModel } from "../../models/product";

jest.mock("../../models/product.js");

describe('GET /products/:productId endpoint', () => {
  it('should return an error message when there is no product with provided ID', (done) => {
    const productId = 200;

    productModel.selectProduct.mockResolvedValue([]);

    request(app)
      .get('/api/products/' + productId)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('No product with id ' + productId);
        return done();
      });
  });

  it('should return the product details for the provided ID', (done) => {
    const productId = 2;

    const response = [{
      id: 2,
      name: "Lorem Ipsum",
      price: 21,
      image_path: "lorem-ipsum.jpg",
      description: "lorem ipsum",
      type: "lorem ipsum"
    }];

    productModel.selectProduct.mockResolvedValue(response);

    request(app)
      .get('/api/products/' + productId)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)
        expect(res.body).toEqual(response[0]);
        return done();
      });
  });
});
