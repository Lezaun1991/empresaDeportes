package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.dto.producto.ProductoDtoView;
import com.victor.proyectofinal.dto.producto.ProductoMapper;
import com.victor.proyectofinal.entity.*;
import com.victor.proyectofinal.repositories.PedidoClienteRepository;
import com.victor.proyectofinal.repositories.ProductoPedidoClienteRepository;
import com.victor.proyectofinal.repositories.ProductoPedidoProveedorRepository;
import com.victor.proyectofinal.repositories.ProductoRepository;
import com.victor.proyectofinal.service.serviceInterfaz.ProductoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository productoRepository;
    private final PedidoClienteRepository pedidoClienteRepository;
    private final ProductoPedidoProveedorRepository productoPedidoProveedorRepository;
    private final ProductoPedidoClienteRepository productoPedidoClienteRepository;
    private final ProductoMapper productoMapper;

    @Override
    public List<ProductoDtoView> encontrarProductosCategoria(Long categoriaId) {
            // Obtener todos los productos y asignar el resultado a una variable
            List<ProductoDtoView> allProductoDtoViews = findAll();

            // Filtrar la lista de DTOs por categoría
            List<ProductoDtoView> productoDtoViewsFiltrados = allProductoDtoViews.stream()
                    .filter(productoDtoView -> productoDtoView.getCategoriaId().equals(categoriaId))
                    .collect(Collectors.toList());

            return productoDtoViewsFiltrados;
        }

    @Override
    public List<ProductoDtoView> findAll() {
        // Obtener todos los productos
        List<Producto> productoList = productoRepository.findAll();
        List<ProductoDtoView> productoDtoViews = new ArrayList<>();
        ProductoDtoView productoDtoView = new ProductoDtoView();
        List<ProductoPedidoProveedor> productoPedidoProveedors = productoPedidoProveedorRepository.findAll();
        for (Producto produc: productoList) {
            for (ProductoPedidoProveedor addFecha: productoPedidoProveedors) {
                productoDtoView = productoMapper.toDto(produc);
                productoDtoView.setCategoriaId(produc.getCategoria().getId());
                productoDtoView.setFechaPedido(addFecha.getPedidoProveedor().getFechaPedido());
                aplicarDescuento(productoDtoView);
            }
            productoDtoViews.add(productoDtoView);

        }


        return productoDtoViews;
    }

    private void aplicarDescuento(ProductoDtoView producto) {
        // Calcular los días transcurridos desde la fecha del pedido
        long daysSinceOrder = ChronoUnit.DAYS.between(producto.getFechaPedido(), LocalDate.now());

        // Aplicar descuentos basados en la cantidad de productos y los días transcurridos
        if (producto.getCantidad() > 20) {
            if (daysSinceOrder > 45) {
                producto.setDescuento(true);
                producto.setPrecioDescuento(producto.getPrecio() * 0.7); // 30% de descuento
            } else {
                producto.setDescuento(false);
                producto.setPrecioDescuento(producto.getPrecio()); // 20% de descuento
            }
        } else if (producto.getCantidad() > 10) {
            if (daysSinceOrder > 45) {
                producto.setDescuento(true);
                producto.setPrecioDescuento(producto.getPrecio() * 0.8); // 20% de descuento
            } else {
                producto.setDescuento(false);
                producto.setPrecioDescuento(producto.getPrecio()); // 10% de descuento
            }
        } else {
            if (daysSinceOrder > 45) {
                producto.setDescuento(true);
                producto.setPrecioDescuento(producto.getPrecio() * 0.9); // 10% de descuento
            } else {
                producto.setDescuento(false);
                producto.setPrecioDescuento(producto.getPrecio()); // Sin descuento
            }
        }
    }


}
