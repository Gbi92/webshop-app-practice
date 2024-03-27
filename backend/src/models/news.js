import { db } from '../data/connection';

export const newsModel = {
  async selectNews() {
    const newsData = await db.query(
      'SELECT id, title, content, unix_timestamp(publishDate) AS publishDate, imagePath, imgOrientation FROM news',
      []
    );
    return newsData;
  }
};
