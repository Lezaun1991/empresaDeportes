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
@Table(name = "producto_pedido_cliente")
public class ProductoPedidoCliente {
    @EmbeddedId
    private ProductoPedidoClienteId id;

    @ManyToOne
    @MapsId("pedidoId")
    @JoinColumn(name = "pedido_cliente_id")
    private PedidoCliente pedidoCliente;

    @ManyToOne
    @MapsId("productoId")
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private Integer cantidad;
    private Double precioUnitario;
}
