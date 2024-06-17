package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.entity.PedidoProveedor;
import com.victor.proyectofinal.enumerado.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PedidoProveedorRepository extends JpaRepository<PedidoProveedor,Long> {
    List<PedidoProveedor> findByFechaEnvioAndEstadoPedido(LocalDate fechaEnvio, EstadoPedido estadoPedido);
}
