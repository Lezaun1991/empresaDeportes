package com.victor.proyectofinal.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class ProductoPedidoProveedorId implements Serializable {
    private Long pedidoId;
    private Long productoId;
}
