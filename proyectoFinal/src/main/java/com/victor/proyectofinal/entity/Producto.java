package com.victor.proyectofinal.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique=true)
    private String nombre;

    @NotBlank
    private String descripcion;

    @NotNull
    @Min(value = 0, message = "La cantidad debe ser mayor o igual a 0")
    private Integer cantidad;

    @NotNull
    @Min(value = 0, message = "El precio debe ser mayor o igual a 0")
    private Double precio;

    private String imagenProducto;

    // Relación con la entidad Proveedor
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "Proveedor_ID")
    @NotNull(message = "Por favor, seleccione un proveedor")
    private Proveedor proveedor;

    // Relación con ProductoPedidoCliente
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductoPedidoCliente> productosPedidoCliente;

    // Relación con ProductoPedidoProveedor
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductoPedidoProveedor> productosPedidoProveedor;

    private Boolean descuento;

    // Relación con la entidad Categoria
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "Categoria_ID")
    @NotNull(message = "Por favor, seleccione una categoria")
    private Categoria categoria;
}

