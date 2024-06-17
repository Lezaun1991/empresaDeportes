package com.victor.proyectofinal.dto.pedido;

import com.victor.proyectofinal.enumerado.EstadoPedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PedidoViewClienteDto {
    private Long id;
    private LocalDate fechaPedido;
    private LocalDate fechaEnvio;
    private EstadoPedido estadoPedido;
    private Double total;
    private List<String> nombreProducto;
    private List<Integer> cantidad;

}
