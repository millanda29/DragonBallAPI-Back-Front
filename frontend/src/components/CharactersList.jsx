import React, { useEffect, useState } from "react";
import { getCharacters } from "../api";
import CharacterDetail from "./CharacterDetail";
import "../components/components.css";

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getCharacters(page, 12) // Aumentamos a 12 para mejor visualización
      .then((res) => {
        setCharacters(res.data.items || []);
        // Calculamos páginas aproximadas (la API no siempre proporciona meta)
        if (res.data.meta) {
          setTotalPages(Math.ceil(res.data.meta.totalItems / 12));
        }
      })
      .catch((error) => {
        console.error('Error loading characters:', error);
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (selectedId) {
    return <CharacterDetail id={selectedId} goBack={() => setSelectedId(null)} />;
  }

  return (
    <section className="characters-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-icon">👥</span>
          Personajes de Dragon Ball
        </h2>
        <p className="section-description">
          Descubre los guerreros más poderosos del universo Dragon Ball
        </p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando personajes épicos...</p>
        </div>
      ) : (
        <>
          <div className="characters-grid">
            {characters.map((char) => (
              <div
                key={char.id}
                className="character-card"
                onClick={() => setSelectedId(char.id)}
              >
                <div className="card-image-container">
                  <div className="card-overlay">
                    <span className="view-details">Ver detalles</span>
                  </div>
                  <img 
                    src={char.image} 
                    alt={char.name}
                    className="card-image"
                    loading="lazy"
                  />
                </div>
                
                <div className="card-content">
                  <h3 className="character-name">{char.name}</h3>
                  
                  <div className="character-stats">
                    <div className="stat-item">
                      <span className="stat-label">Raza:</span>
                      <span className="stat-value">{char.race || 'Desconocida'}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Ki:</span>
                      <span className="stat-value power-level">{char.ki || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button 
              className="pagination-btn prev-btn"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <span className="btn-icon">⬅️</span>
              Anterior
            </button>
            
            <div className="page-info">
              <span className="page-indicator">
                Página <strong>{page}</strong>
                {totalPages > 1 && ` de ${totalPages}`}
              </span>
            </div>
            
            <button 
              className="pagination-btn next-btn"
              onClick={() => setPage((p) => p + 1)}
              disabled={characters.length < 12}
            >
              Siguiente
              <span className="btn-icon">➡️</span>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CharactersList;
