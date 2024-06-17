package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.dto.cliente.ClienteCreateDto;
import com.victor.proyectofinal.dto.cliente.ClienteUpdateCorreoUsernameDto;
import com.victor.proyectofinal.dto.cliente.ClienteViewDto;
import com.victor.proyectofinal.entity.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteService {

    Cliente save(ClienteCreateDto cliente);

    List<ClienteViewDto> findAll();

    Cliente obtenerClientePorToken();

    Cliente actualizarCliente(ClienteUpdateCorreoUsernameDto clienteUpdateCorreoUsernameDto);




}
