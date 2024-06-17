package com.victor.proyectofinal.dto.tarjeta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TarjetaCreateDto {
    private String nombreCompletoTitular;
    private String numeroTarjeta;
    private String fechaExpiracion;
    private String numeroSecreto;
}
