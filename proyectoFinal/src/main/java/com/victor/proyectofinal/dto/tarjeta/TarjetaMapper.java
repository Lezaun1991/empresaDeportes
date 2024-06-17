package com.victor.proyectofinal.dto.tarjeta;

import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.Tarjeta;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;

@Mapper(
        componentModel = "spring",
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface TarjetaMapper {
    Tarjeta toEntity(TarjetaCreateDto tarjetaCreateDto);

    //Tarjeta toEntity(TarjetaViewDto tarjetaViewDto, Cliente cliente);
    Set<TarjetaViewDto> toDtoSet (Set<Tarjeta> tarjeta);
}
