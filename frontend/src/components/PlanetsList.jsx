import React, { useEffect, useState } from "react";
import { getPlanets } from "../api";
import "../components/components.css";

const PlanetsList = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'alive', 'destroyed'

  useEffect(() => {
    setLoading(true);
    getPlanets()
      .then((res) => {
        setPlanets(res.data.items || []);
      })
      .catch((error) => {
        console.error('Error loading planets:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPlanets = planets.filter(planet => {
    if (filter === 'alive') return !planet.isDestroyed;
    if (filter === 'destroyed') return planet.isDestroyed;
    return true; // 'all'
  });

  if (loading) {
    return (
      <section className="planets-section">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando planetas del universo...</p>
        </div>
      </section>
    );
  }

  if (!planets || planets.length === 0) {
    return (
      <section className="planets-section">
        <div className="empty-state">
          <span className="empty-icon">🌌</span>
          <h3>No hay planetas disponibles</h3>
          <p>No se pudieron cargar los planetas en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="planets-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-icon">🌍</span>
          Planetas de Dragon Ball
        </h2>
        <p className="section-description">
          Explora los mundos del universo Dragon Ball
        </p>
      </div>

      <div className="filter-controls">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          🌌 Todos ({planets.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'alive' ? 'active' : ''}`}
          onClick={() => setFilter('alive')}
        >
          🌍 Vivos ({planets.filter(p => !p.isDestroyed).length})
        </button>
        <button 
          className={`filter-btn ${filter === 'destroyed' ? 'active' : ''}`}
          onClick={() => setFilter('destroyed')}
        >
          💥 Destruidos ({planets.filter(p => p.isDestroyed).length})
        </button>
      </div>

      <div className="planets-grid">
        {filteredPlanets.map((planet) => (
          <div key={planet.id} className={`planet-card ${planet.isDestroyed ? 'destroyed' : 'alive'}`}>
            <div className="card-image-container">
              <img 
                src={planet.image} 
                alt={planet.name}
                className="card-image"
                loading="lazy"
              />
              <div className="planet-status">
                {planet.isDestroyed ? (
                  <span className="status-badge destroyed-badge">💥 Destruido</span>
                ) : (
                  <span className="status-badge alive-badge">🌍 Habitado</span>
                )}
              </div>
            </div>
            
            <div className="card-content">
              <h3 className="planet-name">{planet.name}</h3>
              <p className="planet-description">
                {planet.description || 'Un mundo fascinante del universo Dragon Ball'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredPlanets.length === 0 && (
        <div className="empty-filter-state">
          <p>No hay planetas que coincidan con el filtro seleccionado.</p>
        </div>
      )}
    </section>
  );
};

export default PlanetsList;
