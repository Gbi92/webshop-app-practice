import { db } from "../data/connection"

export const countryModel = {
  async selectCountryData() {
    const countryData = await db.query('SELECT * FROM country;', []);
    return countryData.results;
  }
}
