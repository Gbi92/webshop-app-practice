import request from "supertest";

import app from '../../app';

describe('POST /carts/:cartId/item endpoint', () => {
  it('should return an error message when cartId is not valid', (done) => {
    const cartId = 'cart1'
    const body = {productId: 2};

    request(app)
      .post(`/api/carts/${cartId}/item`)
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Cart ID is not valid');
        return done();
      });
  });

  it('should return an error message when productId is not a number', (done) => {
    const cartId = '3c3249e0-e81c-4edd-9de7-56882040cdad'
    const body = {productId: 'dummy'};

    request(app)
      .post(`/api/carts/${cartId}/item`)
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Product ID should be a number');
        return done();
      });
  });
});
