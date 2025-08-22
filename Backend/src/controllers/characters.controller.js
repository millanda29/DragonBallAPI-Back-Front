const CharacterService = require("../services/characters.service");

exports.getAll = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const data = await CharacterService.getAll(page, limit);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo personajes" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await CharacterService.getById(id);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo personaje" });
  }
};
