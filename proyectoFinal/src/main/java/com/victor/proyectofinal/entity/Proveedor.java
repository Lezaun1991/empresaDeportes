package com.victor.proyectofinal.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "proveedor")
public class Proveedor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String nombre; // Nombre del proveedor
    private String ciudad; // Ciudad del proveedor
    private String pais; // País del proveedor
    private String telefono; // Número de teléfono del proveedor
    private String email; // Correo electrónico del proveedor
    @OneToMany(mappedBy = "proveedor")
    private Set<Producto> producto;
    @OneToMany(mappedBy = "proveedor")
    private Set<PedidoProveedor> pedido;

    // Otros atributos relevantes para el proveedor, como número de identificación fiscal, contacto principal, etc.
}
