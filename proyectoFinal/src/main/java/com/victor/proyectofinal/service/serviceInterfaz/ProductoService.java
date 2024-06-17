package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.dto.producto.ProductoDtoView;
import com.victor.proyectofinal.entity.Producto;

import java.util.List;

public interface ProductoService {
    List<ProductoDtoView> findAll();

    List<ProductoDtoView> encontrarProductosCategoria(Long id);
}
