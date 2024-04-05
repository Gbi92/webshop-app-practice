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
});
