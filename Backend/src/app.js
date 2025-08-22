// backend/src/app.js
const express = require("express");
const cors = require("cors");

const characterRoutes = require("./routes/characters.routes");
const planetRoutes = require("./routes/planets.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/characters", characterRoutes);
app.use("/api/planets", planetRoutes);

module.exports = app;
