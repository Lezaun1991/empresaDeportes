package com.victor.proyectofinal.dto.cliente;

import com.victor.proyectofinal.entity.Cliente;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(
        componentModel = "spring",
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface ClienteMapper {

    Cliente toEntity(ClienteCreateDto clienteCreateDto);

    Cliente toEntity(ClienteUpdateCorreoUsernameDto clienteUpdateCorreoUsernameDto);

    ClienteUpdateCorreoUsernameDto toDtoActualizar(Cliente cliente);
    ClienteViewDto toDtoVista(Cliente cliente);

    Set<ClienteViewDto> toDtoSet(Set<Cliente> list);
    List<ClienteViewDto> toDtoList(List<Cliente> list);
}
