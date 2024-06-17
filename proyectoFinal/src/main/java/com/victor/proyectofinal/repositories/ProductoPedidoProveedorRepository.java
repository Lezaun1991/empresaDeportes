package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.entity.ProductoPedidoProveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoPedidoProveedorRepository extends JpaRepository<ProductoPedidoProveedor,Long> {
    @Query("SELECT p FROM ProductoPedidoProveedor p WHERE p.pedidoProveedor.id=?1")
    List<ProductoPedidoProveedor> encontrarProductosPedidoPorId(Long id);

    @Query("SELECT p FROM ProductoPedidoProveedor p WHERE p.pedidoProveedor.id=?1")
    ProductoPedidoProveedor encontrarUnProductosPedidoPorId(Long id);
}
