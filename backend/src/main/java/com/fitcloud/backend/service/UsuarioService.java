package com.fitcloud.backend.service;

import com.fitcloud.backend.model.Usuario;
import com.fitcloud.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // Inyección de dependencias: Spring Boot nos entrega el repositorio
    // automáticamente
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // 1. Crear / Registrar un nuevo usuario con validación
    public Usuario registrarUsuario(Usuario usuario) {
        // Regla de negocio: Verificar si el email ya existe en la base de datos
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuario.getEmail());

        if (usuarioExistente.isPresent()) {
            throw new IllegalArgumentException("Error: El correo electrónico ya está registrado.");
        }

        // Si no existe, lo guardamos
        return usuarioRepository.save(usuario);
    }

    // 2. Obtener todos los usuarios
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    // 3. Obtener un usuario específico por su ID
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }
}