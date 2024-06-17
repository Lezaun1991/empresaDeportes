package com.victor.proyectofinal.dto.categoria;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoriaViewDto {
    private Long id;
    private String nombre;
    private String descripcion;
}
