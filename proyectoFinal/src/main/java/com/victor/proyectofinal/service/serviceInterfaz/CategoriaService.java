package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.dto.categoria.CategoriaViewDto;
import com.victor.proyectofinal.entity.Categoria;

import java.util.List;

public interface CategoriaService {

    List<CategoriaViewDto> findAll();
}
