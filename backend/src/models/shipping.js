import { db } from "../data/connection"

export const shippingModel = {
  async selectShippingData(countryId) {
    const shippingData = await db.query('SELECT cost, duration_in_days FROM shipping WHERE country_id=?;', [countryId]);
    return shippingData.results[0];
  }
}
