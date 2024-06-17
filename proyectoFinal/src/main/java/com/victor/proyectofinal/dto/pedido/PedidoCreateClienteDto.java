package com.victor.proyectofinal.dto.pedido;

import com.victor.proyectofinal.enumerado.EstadoPedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PedidoCreateClienteDto {
        private LocalDate fechaPedido = LocalDate.now();
        private Map<Long, Integer> productosCantidad; // ID del producto y cantidad
        private Long direccionId;
        private Double total;
        private EstadoPedido estadoPedido = EstadoPedido.REALIZADO;
        private String nombreProducto;
        private Integer cantidad;
    }


