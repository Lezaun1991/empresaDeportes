package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.dto.producto.ProductoDtoView;
import com.victor.proyectofinal.entity.Categoria;
import com.victor.proyectofinal.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ProductoRepository extends JpaRepository<Producto,Long> {
    @Query("SELECT p FROM Producto p WHERE p.categoria.id=?1")
    List<ProductoDtoView> encontrarProductosPorIdCategoria(Long id);


    @Query("SELECT p FROM Producto p WHERE p.id=?1")
    Producto encontrarProductosPorId(Long id);




}