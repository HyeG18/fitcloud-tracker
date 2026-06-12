package com.fitcloud.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    private Double peso;
    
    private Integer estatura;

    @Column(name = "fecha_registro", updatable = false)
    private LocalDate fechaRegistro;

    // Constructores
    public Usuario() {
    }

    public Usuario(String nombre, String email, Double peso, Integer estatura) {
        this.nombre = nombre;
        this.email = email;
        this.peso = peso;
        this.estatura = estatura;
    }

    // Este método se ejecuta automáticamente justo antes de guardar en la base de datos
    @PrePersist
    protected void onCreate() {
        this.fechaRegistro = LocalDate.now();
    }

    // --- Getters y Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Double getPeso() { return peso; }
    public void setPeso(Double peso) { this.peso = peso; }

    public Integer getEstatura() { return estatura; }
    public void setEstatura(Integer estatura) { this.estatura = estatura; }

    public LocalDate getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = fechaRegistro; }
}