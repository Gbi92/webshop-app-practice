import logger from "../logger";
import { registrationService } from "../services/registrationService";
import { ValidationError } from "../errors/validationError";

export const registrationController = {
  async registerUser(req, res) {
    try {
      const registrationData = await registrationService.register(req.body);
      res.status(200).json(registrationData);
    } catch (error) {
      logger.error(`Cannot register user due to: ${error.message}`);
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json('Internal server error');
      }
    }
  }
}
