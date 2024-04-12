import request from "supertest";
import { userModel } from '../../models/user';

import app from '../../app';

jest.mock("../../models/user.js");

describe('POST /register endpoint', () => {
  it('should return an error message when name is missing', (done) => {

    const input = {
      email: 'test@test.com',
      password: 'testpassword'
    }

    request(app)
      .post('/api/register')
      .send(input)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Name is required');
        return done();
      });
  });

  it('should return an error message when email is already taken', (done) => {

    const input = {
      name: 'testname',
      email: 'test@test.com',
      password: 'testpassword'
    }

    const response = {
      results: [input.email]
    }

    userModel.selectEmailData.mockResolvedValue(response);

    request(app)
      .post('/api/register')
      .send(input)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Email is already taken');
        return done();
      });
  });

  it('should return 200 when input is correct', (done) => {

    const validInput = {
      name: 'testname',
      email: 'test@test.com',
      password: 'testpassword'
    }

    const emailSelectResponse = {
      results: []
    }

    const insertedResponse = {
      email: 'test@test.com',
      is_admin: 0,
      is_verified: 0
    }

    userModel.selectEmailData.mockResolvedValue(emailSelectResponse);
    userModel.insertUserData.mockResolvedValue(insertedResponse);

    request(app)
      .post('/api/register')
      .send(validInput)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(insertedResponse);
        return done();
      });
  });

  it('should return 500 when server error occurs', (done) => {

    const validInput = {
      name: 'testname',
      email: 'test@test.com',
      password: 'testpassword'
    }

    userModel.selectEmailData.mockRejectedValue(new Error('Database error'));

    request(app)
      .post('/api/register')
      .send(validInput)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Internal server error');
        return done();
      });
  });
})
