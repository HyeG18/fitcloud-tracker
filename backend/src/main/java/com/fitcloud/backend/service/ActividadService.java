package com.fitcloud.backend.service;

import com.fitcloud.backend.model.Actividad;
import com.fitcloud.backend.repository.ActividadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;

    public ActividadService(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
    }

    // 1. Registrar una nueva actividad
    public Actividad registrarActividad(Actividad actividad) {
        // Aquí podríamos validar que la distancia o duración no sean negativas
        if (actividad.getDistanciaKm() <= 0 || actividad.getDuracionMin() <= 0) {
            throw new IllegalArgumentException("La distancia y duración deben ser mayores a 0.");
        }

        return actividadRepository.save(actividad);
    }

    // 2. Obtener todas las actividades de un usuario específico
    public List<Actividad> obtenerActividadesDeUsuario(Long usuarioId) {
        // Usamos el método personalizado que creaste en el repositorio
        return actividadRepository.findByUsuarioId(usuarioId);
    }
}