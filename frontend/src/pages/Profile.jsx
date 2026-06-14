import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { getUsuario } from '../services/api';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsuario()
      .then(res => setUser(res))
      .catch(() => setUser({ nombre: 'Atleta', email: 'atleta@fitcloud.com', peso: 70, estatura: 175, fechaRegistro: '2025-01-01' })) // Mock fallback
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="container animate-fade-in"><p>Cargando perfil...</p></div>;
  }

  return (
    <div className="profile-container container animate-fade-in">
      <h2>Mi Perfil</h2>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={40} />
          </div>
          <div className="profile-titles">
            <h3>{user?.nombre}</h3>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Peso</span>
            <span className="detail-value">{user?.peso} kg</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Estatura</span>
            <span className="detail-value">{user?.estatura} cm</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Miembro desde</span>
            <span className="detail-value">
              {new Date(user?.fechaRegistro || Date.now()).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
