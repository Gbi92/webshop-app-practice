import { registrationService } from "../services/registrationService";
import { ValidationError } from "../validationError";

export const registrationController = {
  async registerUser(req, res) {
    try {
      let registrationData = await registrationService.register(req.body);
      res.status(200).json(registrationData.results[0]);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        console.log(error);
        res.status(500).json('Internal server error');
      }
    }
  }
}
