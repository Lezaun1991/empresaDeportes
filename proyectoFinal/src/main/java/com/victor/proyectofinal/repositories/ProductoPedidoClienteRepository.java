package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.entity.ProductoPedidoCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoPedidoClienteRepository extends JpaRepository<ProductoPedidoCliente,Long> {

    @Query("SELECT p FROM ProductoPedidoCliente p WHERE p.pedidoCliente.id=?1")
    List<ProductoPedidoCliente> encontrarProductosPedidoPorId(Long id);
}
