package com.fitcloud.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "actividades")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private String tipo;
    
    @Column(nullable = false)
    private Double distanciakm;

    @Column(nullable = false)
    private Integer duracionmin;

    @Column(nullable = false)
    private LocalDateTime fecha;

    //Constructores
    public Actividad(){       
    }

    public Actividad( Usuario usuario, String tipo, Double distanciakm, Integer duracionmin, LocalDateTime fecha){
        this.usuario = usuario;
        this.tipo = tipo;
        this.distanciakm = distanciakm;
        this.duracionmin = duracionmin;
        this.fecha = fecha;
    }

    //getters y setters

    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public Usuario getUsuario(){return usuario;}
    public void setUsuario(Usuario usuario){this.usuario = usuario;}
    
    public String getTipo(){ return tipo;}
    public void setTipo( String tipo){ this.tipo = tipo;}

    public Double getDistanciaKm(){ return distanciakm;}
    public void setDistanciaKm( Double distanciakm){ this.distanciakm = distanciakm;}

    public Integer getDuracionMin(){ return duracionmin;}
    public void setDuracionMin( Integer duracionmin){ this.duracionmin = duracionmin;}

    public LocalDateTime getFecha(){ return fecha;}
    public void setFecha( LocalDateTime fecha){ this.fecha = fecha;}




    
}
