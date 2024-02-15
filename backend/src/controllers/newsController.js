import { newsService } from '../services/newsService';

export const newsController = {
  async getNewsData(req, res) {
    try {
      let newsData = await newsService.getNewsData();
      res.status(200).json({'news': newsData.results});
    } catch (error) {
      console.log(error);
      res.status(500).json('Internal server error');
    }
  }
};
