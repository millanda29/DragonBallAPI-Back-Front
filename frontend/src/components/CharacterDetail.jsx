import React, { useEffect, useState } from "react";
import { getCharacterById } from "../api";
import "../components/components.css";

const CharacterDetail = ({ id, goBack }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    setLoading(true);
    getCharacterById(id)
      .then((res) => {
        setCharacter(res.data);
      })
      .catch((error) => {
        console.error('Error loading character:', error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando información del personaje...</p>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="error-container">
        <span className="error-icon">😞</span>
        <h3>Personaje no encontrado</h3>
        <p>No se pudo cargar la información del personaje.</p>
        <button className="back-btn" onClick={goBack}>
          ⬅️ Volver
        </button>
      </div>
    );
  }

  return (
    <div className="character-detail-container">
      <button className="back-btn floating-back" onClick={goBack}>
        ⬅️ Volver a la lista
      </button>

      <div className="character-detail-card">
        <div className="character-hero">
          <div className="character-image-container">
            <img 
              src={character.image} 
              alt={character.name}
              className="character-main-image"
            />
          </div>
          
          <div className="character-header-info">
            <h1 className="character-title">{character.name}</h1>
            <div className="character-badges">
              {character.race && (
                <span className="info-badge race-badge">{character.race}</span>
              )}
              {character.gender && (
                <span className="info-badge gender-badge">
                  {character.gender === 'Male' ? '♂️' : character.gender === 'Female' ? '♀️' : '⚧'} {character.gender}
                </span>
              )}
              {character.affiliation && (
                <span className="info-badge affiliation-badge">
                  🛡️ {character.affiliation}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="character-tabs">
          <button 
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            📊 Información
          </button>
          <button 
            className={`tab-btn ${activeTab === 'transformations' ? 'active' : ''}`}
            onClick={() => setActiveTab('transformations')}
          >
            ⚡ Transformaciones
          </button>
          {character.originPlanet && (
            <button 
              className={`tab-btn ${activeTab === 'origin' ? 'active' : ''}`}
              onClick={() => setActiveTab('origin')}
            >
              🌍 Origen
            </button>
          )}
        </div>

        <div className="tab-content">
          {activeTab === 'info' && (
            <div className="info-tab">
              <div className="power-stats">
                <div className="stat-card">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-info">
                    <span className="stat-label">Ki Actual</span>
                    <span className="stat-value">{character.ki || 'Desconocido'}</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">💪</div>
                  <div className="stat-info">
                    <span className="stat-label">Ki Máximo</span>
                    <span className="stat-value">{character.maxKi || 'Desconocido'}</span>
                  </div>
                </div>
              </div>

              {character.description && (
                <div className="description-section">
                  <h3 className="section-title">📖 Descripción</h3>
                  <p className="character-description">{character.description}</p>
                </div>
              )}

              {character.affiliation && (
                <div className="affiliation-section">
                  <h3 className="section-title">🛡️ Afiliación</h3>
                  <div className="affiliation-card">
                    <span className="affiliation-name">{character.affiliation}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'transformations' && (
            <div className="transformations-tab">
              <h3 className="section-title">⚡ Transformaciones</h3>
              {character.transformations && character.transformations.length > 0 ? (
                <div className="transformations-list">
                  {character.transformations.map((transformation, index) => (
                    <div key={transformation.id || index} className="transformation-card">
                      <div className="transformation-content">
                        <div className="transformation-image-container">
                          <img 
                            src={transformation.image} 
                            alt={transformation.name}
                            className="transformation-image"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="transformation-placeholder" style={{display: 'none'}}>
                            ⚡
                          </div>
                        </div>
                        <div className="transformation-info">
                          <div className="transformation-header">
                            <h4 className="transformation-name">{transformation.name}</h4>
                            {transformation.ki && (
                              <span className="transformation-ki">⚡ {transformation.ki}</span>
                            )}
                          </div>
                          <p className="transformation-description">
                            {transformation.description || `Una poderosa transformación que eleva el ki a ${transformation.ki || 'niveles increíbles'}.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-transformations">
                  <span className="empty-icon">🔮</span>
                  <p>Este personaje no tiene transformaciones registradas.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'origin' && character.originPlanet && (
            <div className="origin-tab">
              <h3 className="section-title">🌍 Planeta de Origen</h3>
              <div className="origin-planet-card">
                <div className="planet-image-container">
                  <img 
                    src={character.originPlanet.image} 
                    alt={character.originPlanet.name}
                    className="planet-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="planet-placeholder" style={{display: 'none'}}>
                    🌍
                  </div>
                </div>
                <div className="planet-info">
                  <div className="planet-header">
                    <h4 className="planet-name">{character.originPlanet.name}</h4>
                    <span className={`planet-status-badge ${character.originPlanet.isDestroyed ? 'destroyed' : 'alive'}`}>
                      {character.originPlanet.isDestroyed ? '💥 Destruido' : '🌍 Habitado'}
                    </span>
                  </div>
                  {character.originPlanet.description && (
                    <p className="planet-description">{character.originPlanet.description}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
