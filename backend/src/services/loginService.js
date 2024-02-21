import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { userModel } from '../models/user';
import { ValidationError } from '../validationError';

export const loginService = {
  loginUser: async (email, password) => {
    if (email === undefined || email.trim() === '') {
      throw new ValidationError('Email is required', 400);
    }
    if (password === undefined || password.trim() === '') {
      throw new ValidationError('Password is required', 400);
    }

    let userData = await userModel.selectUserData(email);

    if (userData.results.length === 0) {
      throw new ValidationError('Email or password is incorrect', 401);
    }

    let match = bcrypt.compareSync(password, userData.results[0].password);

    if (match === false) {
      throw new ValidationError('Password is incorrect', 401);
    }

    const token = loginService.createTokenJWT(userData.results[0]);

    return { status: 'ok', token };
  },

  createTokenJWT(userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
        isVerified: userData.isVerified,
      },
      config.tokenSecret,
    );
  }
};
