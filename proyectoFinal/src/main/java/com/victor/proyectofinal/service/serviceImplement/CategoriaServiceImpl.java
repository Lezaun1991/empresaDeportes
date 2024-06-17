package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.dto.categoria.CategoriaMapper;
import com.victor.proyectofinal.dto.categoria.CategoriaViewDto;
import com.victor.proyectofinal.entity.Categoria;
import com.victor.proyectofinal.repositories.CategoriaRepository;
import com.victor.proyectofinal.service.serviceInterfaz.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final CategoriaMapper categoriaMapper;
    @Override
    public List<CategoriaViewDto> findAll() {
        List<Categoria> listCategoria = categoriaRepository.findAll();
        return categoriaMapper.toDtoList(listCategoria);
    }
}
