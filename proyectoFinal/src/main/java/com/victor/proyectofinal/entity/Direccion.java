package com.victor.proyectofinal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "direccion")
public class Direccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoVia;
    private String domicilio;
    private String ciudad;
    private String codigoPostal;
    private String numero;
    private String piso;
    private String pais;
    private boolean activo = true;
    private Boolean administrador;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    @JsonIgnore
    @OneToMany(mappedBy = "direccion")
    private Set<PedidoCliente> pedido;

}

