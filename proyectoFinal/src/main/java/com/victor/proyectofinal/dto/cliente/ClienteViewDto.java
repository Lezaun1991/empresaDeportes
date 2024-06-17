package com.victor.proyectofinal.dto.cliente;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteViewDto {

    private Long id;
    private String username;
    private String nombre;
    private String primerApellido;
    private String segundoApellido;
    private Integer telefono;
    private String email;

}
