import { newsModel } from '../models/news';

export const newsService = {
  async getNewsData() {
    const data = await newsModel.selectNews();

    return data;
  }
};
