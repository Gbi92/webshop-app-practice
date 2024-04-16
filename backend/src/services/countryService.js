import { countryModel } from "../models/country";

export const countryService = {
  async getCountryData() {
    const data = await countryModel.selectCountryData();
    return data;
  }
};
