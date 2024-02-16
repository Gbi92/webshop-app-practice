import { userModel } from '../models/user';
import bcrypt from 'bcrypt';
import { ValidationError } from '../validationError';

export const registrationService = {
  async register(userData) {
    validateInput(userData);

    let data = await userModel.selectEmailData(userData.email);
    if (data.results.length === 0) {
      const hashedPassword = await this.encryptPassword(userData.password);
      return userModel.insertUserData(userData.name, userData.email, hashedPassword) 
    } else {
      throw new ValidationError('Email is already taken.');
    }
  },

  async encryptPassword(password) {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
};

function validateInput(input) {
  if (Object.keys(input).length === 0) {
    throw new ValidationError('Name, email and password are required.');
  }

  if (!input.password) {
    throw new ValidationError('Password is required');
  }

  if (!input.name) {
    throw new ValidationError('Name is required');
  }

  if (!input.email) {
    throw new ValidationError('Email is required.');
  }

  if (input.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters.');
  }
}
