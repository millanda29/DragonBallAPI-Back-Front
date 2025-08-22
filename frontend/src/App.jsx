import React, { useState } from "react";
import CharactersList from "./components/CharactersList";
import PlanetsList from "./components/PlanetsList";
import './components/components.css';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('characters');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <span className="dragon-ball-icon">🐉</span>
          Dragon Ball Explorer
          <span className="lightning-icon">⚡</span>
        </h1>
        <p className="app-subtitle">Explora el universo de Dragon Ball</p>
        
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${activeView === 'characters' ? 'active' : ''}`}
            onClick={() => setActiveView('characters')}
          >
            👥 Personajes
          </button>
          <button 
            className={`nav-tab ${activeView === 'planets' ? 'active' : ''}`}
            onClick={() => setActiveView('planets')}
          >
            🌍 Planetas
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeView === 'characters' && <CharactersList />}
        {activeView === 'planets' && <PlanetsList />}
      </main>

      <footer className="app-footer">
        <p>© 2025 Dragon Ball Explorer - Bootcamp Project</p>
      </footer>
    </div>
  );
}

export default App;
