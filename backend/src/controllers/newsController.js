import logger from '../logger';
import { newsService } from '../services/newsService';

export const newsController = {
  async getNewsData(req, res) {
    try {
      const newsData = await newsService.getNewsData();
      res.status(200).json({'news': newsData.results});
    } catch (error) {
      logger.error(`Cannot retrieve news data due to: ${error.message}`);
      res.status(500).json('Internal server error');
    }
  }
};
