package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.dto.cliente.ClienteCreateDto;
import com.victor.proyectofinal.dto.direccion.DireccionDto;
import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.Direccion;

import java.util.Set;

public interface DireccionService {

    Direccion save(DireccionDto cliente);

    Set<DireccionDto> buscarDireccionesId();

    void deleteActive (Long id);


}
