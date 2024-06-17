package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.dto.pedido.PedidoCreateClienteDto;
import com.victor.proyectofinal.dto.pedido.PedidoViewClienteDto;
import com.victor.proyectofinal.entity.PedidoCliente;

import java.util.List;

public interface PedidoClienteService {

    PedidoCliente save (PedidoCreateClienteDto pedidoCreateClienteDto);

    List<PedidoViewClienteDto> mostrarPedidos();
}
