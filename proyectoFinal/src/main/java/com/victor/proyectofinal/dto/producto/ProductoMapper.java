package com.victor.proyectofinal.dto.producto;

import com.victor.proyectofinal.entity.Producto;
import com.victor.proyectofinal.entity.Proveedor;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(
        componentModel = "spring",
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface ProductoMapper {
    @Mappings({
            @Mapping(source = "proveedor.nombre", target = "proveedor") // Mapea el nombre del proveedor
    })

    List<ProductoDtoView> toDtoList(List<Producto> list);
    ProductoDtoView toDto(Producto producto);

    // Método de mapeo personalizado para convertir un Proveedor a String
    default String map(Proveedor proveedor) {
        return proveedor.getNombre();
    }
}
