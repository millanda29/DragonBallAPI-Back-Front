const PlanetService = require("../services/planets.service");

exports.getAll = async (req, res) => {
  try {
    const data = await PlanetService.getAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo planetas" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const planet = await PlanetService.getById(id);
    res.json(planet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo planeta" });
  }
};
