package com.victor.proyectofinal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto_pedido_proveedor")
public class ProductoPedidoProveedor {
    @EmbeddedId
    private ProductoPedidoProveedorId id;

    @ManyToOne
    @MapsId("pedidoId")
    @JoinColumn(name = "pedido_proveedor_id")
    private PedidoProveedor pedidoProveedor;

    @ManyToOne
    @MapsId("productoId")
    @JoinColumn(name = "producto_id")
    private Producto producto;
    private Double precioUnitario;

    private Integer cantidad;
}
