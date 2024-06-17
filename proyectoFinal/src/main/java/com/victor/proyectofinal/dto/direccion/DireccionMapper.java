package com.victor.proyectofinal.dto.direccion;

import com.victor.proyectofinal.dto.cliente.ClienteCreateDto;
import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.Direccion;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;

@Mapper(
        componentModel = "spring",
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface DireccionMapper {
    Direccion toEntity(DireccionDto dto);

    @Mapping(target = "nombreCliente", source = "nombre")
    @Mapping(target = "primerApellidoCliente", source = "primerApellido")
    @Mapping(target = "segundoApellidoCliente", source = "segundoApellido")
    @Mapping(target = "telefonoCliente", source = "telefono")
    @Mapping(target = "emailCliente", source = "email")
    Set<DireccionDto> toDtoSet (Set<Direccion> direccionSet);
}
