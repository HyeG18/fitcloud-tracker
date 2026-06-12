package com.fitcloud.backend.controller;

import com.fitcloud.backend.model.Actividad;
import com.fitcloud.backend.service.ActividadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actividades")
@CrossOrigin(origins = "*")
public class ActividadController {

    private final ActividadService actividadService;

    public ActividadController(ActividadService actividadService) {
        this.actividadService = actividadService;
    }

    // 1. POST: http://localhost:8080/api/actividades (Registrar entrenamiento)
    @PostMapping
    public ResponseEntity<?> crearActividad(@RequestBody Actividad actividad) {
        try {
            Actividad nuevaActividad = actividadService.registrarActividad(actividad);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaActividad);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 2. GET: http://localhost:8080/api/actividades/usuario/{usuarioId} (Historial
    // por usuario)
    @GetMapping("/usuario/{usuarioId}")
    public List<Actividad> listarPorUsuario(@PathVariable Long usuarioId) {
        return actividadService.obtenerActividadesDeUsuario(usuarioId);
    }
}