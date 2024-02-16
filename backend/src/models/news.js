import { db } from '../data/connection';

export const newsModel = {
  async selectNews() {
    let newsData = await db.query(
      'SELECT id, title, content, unix_timestamp(publishDate) AS publishDate FROM news',
      []
    );
    return newsData;
  }
};
