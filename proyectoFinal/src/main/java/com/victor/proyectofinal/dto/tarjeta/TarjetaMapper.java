package com.victor.proyectofinal.dto.tarjeta;


import com.victor.proyectofinal.entity.Tarjeta;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;



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
