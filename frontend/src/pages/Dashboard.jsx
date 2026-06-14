import { useState, useEffect } from 'react';
import { Target, TrendingUp, Clock, Plus } from 'lucide-react';
import { getActividades, getUsuario } from '../services/api';
import ActivityModal from '../components/ActivityModal';
import './Dashboard.css';

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [actsRes, userRes] = await Promise.all([
        getActividades().catch(() => []), // Fallback to empty if api is down
        getUsuario().catch(() => ({ id: 1, nombre: 'Atleta', peso: 70, estatura: 175 }))
      ]);
      setActivities(Array.isArray(actsRes) ? actsRes : []);
      setUser(userRes);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalKm = activities.reduce((sum, act) => sum + (act.distanciaKm || 0), 0).toFixed(1);
  const totalMin = activities.reduce((sum, act) => sum + (act.duracionMin || 0), 0);

  return (
    <div className="dashboard-container container animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="greeting">Hola, {user?.nombre || 'Deportista'}</h1>
          <p className="subtitle">Aquí está el resumen de tu progreso.</p>
        </div>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Registrar</span>
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper"><Target className="stat-icon" /></div>
          <div className="stat-info">
            <span className="stat-value">{activities.length}</span>
            <span className="stat-label">Entrenamientos</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper"><TrendingUp className="stat-icon" /></div>
          <div className="stat-info">
            <span className="stat-value">{totalKm} <small>km</small></span>
            <span className="stat-label">Distancia total</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper"><Clock className="stat-icon" /></div>
          <div className="stat-info">
            <span className="stat-value">{totalMin} <small>min</small></span>
            <span className="stat-label">Tiempo total</span>
          </div>
        </div>
      </div>

      <div className="feed-section">
        <h2>Últimas Actividades</h2>
        {loading ? (
          <div className="loading-state">Cargando actividades...</div>
        ) : activities.length === 0 ? (
          <div className="empty-state">No tienes actividades registradas aún.</div>
        ) : (
          <div className="activity-list">
            {activities.slice().reverse().map(act => (
              <div key={act.id || Math.random()} className="activity-card">
                <div className="activity-type">{act.tipo}</div>
                <div className="activity-details">
                  <span>{act.distanciaKm} km</span>
                  <span className="dot">•</span>
                  <span>{act.duracionMin} min</span>
                </div>
                <div className="activity-date">
                  {new Date(act.fecha || Date.now()).toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ActivityModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsModalOpen(false);
            fetchData();
          }} 
        />
      )}
    </div>
  );
};

export default Dashboard;
