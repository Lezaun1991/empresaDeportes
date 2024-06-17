package com.victor.proyectofinal.dto.pedido;

import com.victor.proyectofinal.entity.PedidoCliente;
import com.victor.proyectofinal.entity.PedidoProveedor;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(
        componentModel = "spring",
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface PedidoMapper {
    @Mappings({
            @Mapping(target = "direccion.id", source = "pedidoCreateClienteDto.direccionId")
    })
    PedidoCliente toEntity(PedidoCreateClienteDto pedidoCreateClienteDto);

    default Long mapDireccionIdToId(Long direccionId) {
        return direccionId;
    }


    List<PedidoViewClienteDto> toDtoList(List<PedidoCliente> pedido);
    List<PedidoViewClienteDto> toDtoListPro(List<PedidoProveedor> pedido);

}
