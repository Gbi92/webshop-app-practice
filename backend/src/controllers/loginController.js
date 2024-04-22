import logger from '../logger.js';
import { loginService } from '../services/loginService.js';
import { ValidationError } from "../errors/validationError";

export const loginController = {
  async login (req, res) {
    const { email, password } = req.body;

    try {
      const result = await loginService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      logger.error(`Cannot login user due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  }
};
