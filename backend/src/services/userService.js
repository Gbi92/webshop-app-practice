import { userModel } from '../models/user';
import bcrypt from 'bcrypt';
import { ValidationError } from "../errors/validationError";
import config from '../config';
import { emailService } from './emailService/emailService';
import { emailGenerator } from './emailService/emailGenerator';

export const userService = {
  async register(userData) {
    validateInput(userData);

    const data = await userModel.selectEmailData(userData.email);
    if (data.results.length === 0) {
      const hashedPassword = await this.encryptPassword(userData.password);
      const newUserData = await userModel.insertUserData(userData.name, userData.email, hashedPassword);

      const url = `${config.frontendUrl}/user-verification?user_id=${newUserData.id}&verification_token=${newUserData.token}`;
      const emailContent = emailGenerator.verificationTemplate(userData.name, url);
      emailService.sendEmail(userData.email, 'Welcome', emailContent);

      return newUserData;
    } else {
      throw new ValidationError('Email is already taken', 400);
    }
  },

  async encryptPassword(password) {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  async verify(userData) {
    const isUserVerified = await userModel.verifyUserById(userData.userId, userData.token);
    if (!isUserVerified) {
      throw new ValidationError('Verification failed', 400);
    }
  },
};

function validateInput(input) {
  if (Object.keys(input).length === 0) {
    throw new ValidationError('Name, email and password are required', 400);
  }

  if (!input.password) {
    throw new ValidationError('Password is required', 400);
  }

  if (!input.name) {
    throw new ValidationError('Name is required', 400);
  }

  if (!input.email) {
    throw new ValidationError('Email is required', 400);
  }

  if (input.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters', 400);
  }
}
