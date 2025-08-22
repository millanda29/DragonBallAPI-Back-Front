const axios = require("axios");
const BASE_URL = "https://dragonball-api.com/api";

class CharacterService {
  static async getAll(page = 1, limit = 10) {
    const res = await axios.get(`${BASE_URL}/characters?page=${page}&limit=${limit}`);
    return res.data;
  }

  static async getById(id) {
    const res = await axios.get(`${BASE_URL}/characters/${id}`);
    return res.data;
  }
}

module.exports = CharacterService;
