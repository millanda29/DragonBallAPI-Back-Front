import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // tu backend
});

export const getCharacters = (page = 1, limit = 10) =>
  API.get(`/characters?page=${page}&limit=${limit}`);

export const getCharacterById = (id) =>
  API.get(`/characters/${id}`);

export const getPlanets = () =>
  API.get(`/planets`);
