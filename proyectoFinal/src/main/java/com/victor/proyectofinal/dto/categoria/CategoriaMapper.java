package com.victor.proyectofinal.dto.categoria;

import com.victor.proyectofinal.entity.Categoria;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(
        componentModel = "spring",
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface CategoriaMapper {

    List<CategoriaViewDto> toDtoList(List<Categoria> categoriaList);
}
