package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.dto.pedido.PedidoViewClienteDto;

import java.util.List;

public interface PedidoProveedorService {
    List<PedidoViewClienteDto> mostrarPedidosProveedores();
}
