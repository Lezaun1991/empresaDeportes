package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.component.EmailService;
import com.victor.proyectofinal.dto.pedido.PedidoCreateClienteDto;
import com.victor.proyectofinal.dto.pedido.PedidoMapper;
import com.victor.proyectofinal.dto.pedido.PedidoViewClienteDto;
import com.victor.proyectofinal.entity.*;
import com.victor.proyectofinal.enumerado.EstadoPedido;
import com.victor.proyectofinal.repositories.*;
import com.victor.proyectofinal.service.serviceInterfaz.ClienteService;
import com.victor.proyectofinal.service.serviceInterfaz.PedidoClienteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PedidoClienteServiceImpl implements PedidoClienteService {

    private final PedidoClienteRepository pedidoClienteRepository;
    private final DireccionRepository direccionRepository;
    private final ProductoRepository productoRepository;
    private final ProductoPedidoClienteRepository productoPedidoClienteRepository;
    private final PedidoProveedorRepository pedidoProveedorRepository;
    private final ProductoPedidoProveedorRepository productoPedidoProveedorRepository;
    private final EmailService emailService;
    private final ClienteService clienteService;
    private final PedidoMapper pedidoMapper;

    @Override
    public List<PedidoViewClienteDto> mostrarPedidos() {
        Cliente cliente = clienteService.obtenerClientePorToken();
        List<PedidoCliente> listadoPedidos = pedidoClienteRepository.encontrarPedidosPorIdCliente(cliente.getId());//obtengo los pedidos
        List<PedidoViewClienteDto> listadoPedidosDto = pedidoMapper.toDtoList(listadoPedidos);

        for (PedidoViewClienteDto pedidoDto : listadoPedidosDto) {
            List<ProductoPedidoCliente> listaProductosPedido = productoPedidoClienteRepository.encontrarProductosPedidoPorId(pedidoDto.getId());
            List<String> nombresProducto = new ArrayList<>();
            List<Integer> cantidadesProducto = new ArrayList<>();

            for (ProductoPedidoCliente productoPedidoCliente : listaProductosPedido) {
                Producto producto = productoRepository.encontrarProductosPorId(productoPedidoCliente.getProducto().getId());
                nombresProducto.add(producto.getNombre());
                cantidadesProducto.add(productoPedidoCliente.getCantidad());
            }

            pedidoDto.setNombreProducto(nombresProducto);
            pedidoDto.setCantidad(cantidadesProducto);
        }

        return listadoPedidosDto;
    }

    @Override
    @Transactional
    public PedidoCliente save(PedidoCreateClienteDto pedidoCreateClienteDto) {
        Cliente obtenerCliente = clienteService.obtenerClientePorToken();

        PedidoCliente nuevoPedido = pedidoMapper.toEntity(pedidoCreateClienteDto);
        Direccion direccionPorId = direccionRepository.buscarUnaDireccion(pedidoCreateClienteDto.getDireccionId());

        nuevoPedido.setDireccion(direccionPorId);//aqui se lo añado al nuevoPedido, que en principio con eso direccion_id ya no es null
        nuevoPedido.setCliente(obtenerCliente);

        // Asignar una fecha de envío aleatoria de 1 a 3 días desde hoy
        Random random = new Random();
        int diasParaEnvio = 1 + random.nextInt(3); // Genera un número aleatorio entre 1 y 3
        LocalDate fechaEnvio = LocalDate.now().plusDays(diasParaEnvio); // Suma los días aleatorios a la fecha actual
        nuevoPedido.setFechaEnvio(fechaEnvio);

        pedidoClienteRepository.save(nuevoPedido);


        for (Map.Entry<Long, Integer> entry : pedidoCreateClienteDto.getProductosCantidad().entrySet()) {

            log.info("ESTA ENTRANDO AQUI??");
            Long productoId = entry.getKey();
            Integer cantidad = entry.getValue();

            Producto producto = productoRepository.encontrarProductosPorId(productoId);
            ProductoPedidoCliente nuevoProductoPedidoCliente = new ProductoPedidoCliente();
            nuevoProductoPedidoCliente.setPedidoCliente(nuevoPedido);
            nuevoProductoPedidoCliente.setProducto(producto);
            nuevoProductoPedidoCliente.setCantidad(cantidad);
            nuevoProductoPedidoCliente.setPrecioUnitario(producto.getPrecio());


            ProductoPedidoClienteId productoPedidoClienteId = new ProductoPedidoClienteId(nuevoPedido.getId(), productoId);
            nuevoProductoPedidoCliente.setId(productoPedidoClienteId);

            productoPedidoClienteRepository.save(nuevoProductoPedidoCliente);


            producto.setCantidad(producto.getCantidad() - cantidad);
            productoRepository.save(producto);
            verificarYGenerarPedidoAutomatico(producto);

        }
        emailService.enviarCorreoConfirmacion(nuevoPedido,obtenerCliente);

        //nuevoPedido.setProductos(productosPedido);

        return nuevoPedido;
    }
    private void verificarYGenerarPedidoAutomatico(Producto producto) {
        if (producto.getCantidad() <= 0) {
            PedidoProveedor pedidoProveedor = new PedidoProveedor();
            pedidoProveedor.setProveedor(producto.getProveedor());
            pedidoProveedor.setFechaPedido(LocalDate.now());
            Random random = new Random();
            int diasParaEnvio = 1 + random.nextInt(4); // Genera un número aleatorio entre 1 y 3
            LocalDate fechaEnvio = LocalDate.now().plusDays(diasParaEnvio); // Suma los días aleatorios a la fecha actual
            pedidoProveedor.setFechaEnvio(fechaEnvio); // Fecha de envío estimada
            pedidoProveedor.setDireccion(direccionRepository.buscarDireccionAdmin()); // Suponiendo que tienes una dirección por defecto para el proveedor
            pedidoProveedor.setEstadoPedido(EstadoPedido.REALIZADO);
            pedidoProveedor.setTotal(0.0); // Inicializamos en 0, actualizaremos luego

            pedidoProveedorRepository.save(pedidoProveedor);

            ProductoPedidoProveedor productoPedidoProveedor = new ProductoPedidoProveedor();
            ProductoPedidoProveedorId productoPedidoProveedorId = new ProductoPedidoProveedorId(pedidoProveedor.getId(), producto.getId());
            productoPedidoProveedor.setId(productoPedidoProveedorId);
            productoPedidoProveedor.setProducto(producto);
            productoPedidoProveedor.setPedidoProveedor(pedidoProveedor);
            productoPedidoProveedor.setCantidad(100); // Cantidad fija o lógica para determinar la cantidad a pedir
            productoPedidoProveedor.setPrecioUnitario(producto.getPrecio());

            productoPedidoProveedorRepository.save(productoPedidoProveedor);

            // Actualizar el total del pedido
            pedidoProveedor.setTotal(100 * producto.getPrecio());
            pedidoProveedorRepository.save(pedidoProveedor);
        }
    }


}

