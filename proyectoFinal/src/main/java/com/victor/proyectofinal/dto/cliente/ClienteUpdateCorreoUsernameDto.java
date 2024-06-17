package com.victor.proyectofinal.dto.cliente;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteUpdateCorreoUsernameDto {
    private String username;
    private String nombre;
    private String primerApellido;
    private String segundoApellido;
    private Integer telefono;
    private String email;

}
