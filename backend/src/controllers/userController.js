import logger from "../logger";
import { userService } from "../services/userService";
import { ValidationError } from "../errors/validationError";

export const userController = {
  async registerUser(req, res) {
    try {
      const registrationData = await userService.register(req.body);
      res.status(200).json(registrationData);
    } catch (error) {
      logger.error(`Cannot register user due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },

  async verifyUser(req, res) {
    try {
      await userService.verify(req.params);
      res.status(200);
    } catch (error) {
      logger.error(`Cannot verify user due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  },
}
