package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.dto.pedido.PedidoMapper;
import com.victor.proyectofinal.dto.pedido.PedidoViewClienteDto;
import com.victor.proyectofinal.entity.*;
import com.victor.proyectofinal.repositories.PedidoProveedorRepository;
import com.victor.proyectofinal.repositories.ProductoPedidoProveedorRepository;
import com.victor.proyectofinal.repositories.ProductoRepository;
import com.victor.proyectofinal.service.serviceInterfaz.PedidoProveedorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PedidoProveedorServiceImpl implements PedidoProveedorService {
    private final PedidoProveedorRepository pedidoProveedorRepository;
    private final ProductoPedidoProveedorRepository productoPedidoProveedorRepository;
    private final ProductoRepository productoRepository;
    private final PedidoMapper pedidoMapper;


    @Override
    public List<PedidoViewClienteDto> mostrarPedidosProveedores() {

        List<PedidoProveedor> listadoPedidos = pedidoProveedorRepository.findAll();//obtengo los pedidos
        List<PedidoViewClienteDto> listadoPedidosDto = pedidoMapper.toDtoListPro(listadoPedidos);

        for (PedidoViewClienteDto pedidoDto : listadoPedidosDto) {
            List<ProductoPedidoProveedor> listaProductosPedido = productoPedidoProveedorRepository.encontrarProductosPedidoPorId(pedidoDto.getId());
            List<String> nombresProducto = new ArrayList<>();
            List<Integer> cantidadesProducto = new ArrayList<>();

            for (ProductoPedidoProveedor productoPedidoCliente : listaProductosPedido) {
                Producto producto = productoRepository.encontrarProductosPorId(productoPedidoCliente.getProducto().getId());
                nombresProducto.add(producto.getNombre());
                cantidadesProducto.add(productoPedidoCliente.getCantidad());
            }

            pedidoDto.setNombreProducto(nombresProducto);
            pedidoDto.setCantidad(cantidadesProducto);
        }

        return listadoPedidosDto;
    }
}
