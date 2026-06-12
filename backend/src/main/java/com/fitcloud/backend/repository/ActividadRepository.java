package com.fitcloud.backend.repository;

import com.fitcloud.backend.model.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long> {

    // Esto nos permitirá buscar todo el historial de ejercicios de una sola persona
    List<Actividad> findByUsuarioId(Long usuarioId);
}