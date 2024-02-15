import { newsModel } from '../models/news';

export const newsService = {
  async getNewsData() {
    let data = await newsModel.selectNews();

    return data;
  }
};
