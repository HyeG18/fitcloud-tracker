import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Save } from 'lucide-react';
import { createActividad } from '../services/api';
import './ActivityModal.css';

const ActivityModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    tipo: 'Trote',
    distanciaKm: '',
    duracionMin: '',
    fecha: new Date().toISOString().slice(0, 16)
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.distanciaKm || !formData.duracionMin) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createActividad({
        ...formData,
        distanciaKm: parseFloat(formData.distanciaKm),
        duracionMin: parseInt(formData.duracionMin, 10),
        usuario_id: 1
      });

      onSuccess();
    } catch (err) {
      setError('Ocurrió un error al guardar la actividad.');
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content" role="dialog" aria-modal="true">
        <button className="close-btn" onClick={onClose} type="button">
          <X size={24} />
        </button>

        <h2>Registrar Actividad</h2>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="activity-form">
          <div className="form-group">
            <label>Tipo de ejercicio</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            >
              <option value="Trote">Trote</option>
              <option value="Ciclismo">Ciclismo</option>
              <option value="Caminata">Caminata</option>
              <option value="Natación">Natación</option>
              <option value="Fuerza">Fuerza</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Distancia (km)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej. 5.5"
                value={formData.distanciaKm}
                onChange={(e) => setFormData({ ...formData, distanciaKm: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Duración (min)</label>
              <input
                type="number"
                min="1"
                placeholder="Ej. 45"
                value={formData.duracionMin}
                onChange={(e) => setFormData({ ...formData, duracionMin: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Fecha y hora</label>
            <input
              type="datetime-local"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            <Save size={18} />
            <span>{loading ? 'Guardando...' : 'Guardar Entrenamiento'}</span>
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default ActivityModal;