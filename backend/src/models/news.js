import { db } from '../data/connection';

export const newsModel = {
  async selectNews() {
    const newsData = await db.query(
      'SELECT id, title, content, unix_timestamp(publish_date) AS publish_date, image_path, img_orientation FROM news',
      []
    );
    return newsData.results;
  }
};
