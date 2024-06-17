package com.victor.proyectofinal.dto.direccion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DireccionDto {
    private Long id;
    private String tipoVia;
    private String domicilio;
    private String ciudad;
    private String codigoPostal;
    private String numero;
    private String piso;
    private String pais;
    private String nombreCliente;
    private String primerApellidoCliente;
    private String segundoApellidoCliente;
    private String telefonoCliente;
    private String emailCliente;
}
