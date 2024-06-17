package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.entity.PedidoCliente;
import com.victor.proyectofinal.enumerado.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PedidoClienteRepository extends JpaRepository<PedidoCliente, Long> {

    @Query("SELECT p FROM PedidoCliente p  WHERE p.cliente.id=?1")
    List<PedidoCliente> encontrarPedidosPorIdCliente(Long clienteId);


    List<PedidoCliente> findByFechaEnvioAndEstadoPedido(LocalDate fechaEnvio, EstadoPedido estadoPedido);

}
