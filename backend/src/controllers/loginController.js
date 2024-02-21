import { loginService } from '../services/loginService.js';
import { ValidationError } from '../validationError.js';

export const loginController = {
  async login (req, res) {
    const { email, password } = req.body;

    try {
      const result = await loginService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        console.log(error);
        res.status(500).json('Internal server error');
      }
    }
  }
};
