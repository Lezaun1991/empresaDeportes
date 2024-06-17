package com.victor.proyectofinal.dto.producto;

import com.victor.proyectofinal.entity.Proveedor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoDtoView {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Double precioDescuento;
    private String proveedor;
    private Integer cantidad;
    private String imagenProducto;
    private Boolean descuento;
    private Long categoriaId;
    private LocalDate fechaPedido;
    private Long pedidoProveedorId;

}
