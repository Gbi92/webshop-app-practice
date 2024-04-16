import logger from '../logger';
import { countryService } from '../services/countryService';

export const countryController = {
  async getCountryData(req, res) {
    try {
      const countryData = await countryService.getCountryData();
      res.status(200).json(countryData);
    } catch (error) {
      logger.error(`Cannot retrieve country data due to: ${error.message}`);
      res.status(500).json('Internal server error');
    }
  }
};
