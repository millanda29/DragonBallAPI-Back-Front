const axios = require("axios");
const BASE_URL = "https://dragonball-api.com/api";

class PlanetService {
  static async getAll() {
    const res = await axios.get(`${BASE_URL}/planets`);
    return res.data;
  }

  static async getById(id) {
    const res = await axios.get(`${BASE_URL}/planets/${id}`);
    return res.data;
  }
}

module.exports = PlanetService;
