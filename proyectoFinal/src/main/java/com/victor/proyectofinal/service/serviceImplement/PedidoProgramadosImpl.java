package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.entity.PedidoCliente;
import com.victor.proyectofinal.entity.PedidoProveedor;
import com.victor.proyectofinal.entity.Producto;
import com.victor.proyectofinal.entity.ProductoPedidoProveedor;
import com.victor.proyectofinal.enumerado.EstadoPedido;
import com.victor.proyectofinal.repositories.PedidoClienteRepository;
import com.victor.proyectofinal.repositories.PedidoProveedorRepository;
import com.victor.proyectofinal.repositories.ProductoPedidoProveedorRepository;
import com.victor.proyectofinal.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoProgramadosImpl {

        private final PedidoClienteRepository pedidoClienteRepository;
        private final PedidoProveedorRepository pedidoProveedorRepository;
        private final ProductoRepository productoRepository;
        private final ProductoPedidoProveedorRepository productoPedidoProveedorRepository;

        @Scheduled(cron = "0 0 0 * * ?") // Ejecutar todos los días a medianoche
        @Transactional
        public void actualizarPedidos() {
            LocalDate hoy = LocalDate.now();
            actualizarPedidosCliente(hoy);
            actualizarPedidosProveedor(hoy);
        }

        //@PostConstruct
        public void verificarYActualizarPedidos() {
            LocalDate hoy = LocalDate.now();
            actualizarPedidosCliente(hoy);
            actualizarPedidosProveedor(hoy);
        }

        private void actualizarPedidosCliente(LocalDate fecha) {
            actualizarPedidosEnviadosCliente(fecha);
            actualizarPedidosEntregadosCliente(fecha.minusDays(1)); // Obtener la fecha del día anterior
        }

        private void actualizarPedidosProveedor(LocalDate fecha) {
            actualizarPedidosEnviadosProveedor(fecha);
            actualizarPedidosEntregadosProveedor(fecha.minusDays(1)); // Obtener la fecha del día anterior
        }

        private void actualizarPedidosEnviadosCliente(LocalDate fecha) {
            List<PedidoCliente> pedidos = pedidoClienteRepository.findByFechaEnvioAndEstadoPedido(fecha, EstadoPedido.REALIZADO);

            for (PedidoCliente pedido : pedidos) {
                pedido.setEstadoPedido(EstadoPedido.ENVIADO);
            }

            try {
                pedidoClienteRepository.saveAll(pedidos);
            } catch (Exception e) {
                // Manejar la excepción (por ejemplo, registrar el error)
                System.err.println("Error al actualizar los pedidos de cliente: " + e.getMessage());
            }
        }

        private void actualizarPedidosEntregadosCliente(LocalDate fecha) {
            List<PedidoCliente> pedidos = pedidoClienteRepository.findByFechaEnvioAndEstadoPedido(fecha, EstadoPedido.ENVIADO);

            for (PedidoCliente pedido : pedidos) {
                pedido.setEstadoPedido(EstadoPedido.ENTREGADO);
            }

            try {
                pedidoClienteRepository.saveAll(pedidos);
            } catch (Exception e) {
                // Manejar la excepción (por ejemplo, registrar el error)
                System.err.println("Error al actualizar los pedidos de cliente: " + e.getMessage());
            }
        }

        private void actualizarPedidosEnviadosProveedor(LocalDate fecha) {
            List<PedidoProveedor> pedidos = pedidoProveedorRepository.findByFechaEnvioAndEstadoPedido(fecha, EstadoPedido.REALIZADO);

            for (PedidoProveedor pedido : pedidos) {
                pedido.setEstadoPedido(EstadoPedido.ENVIADO);
            }

            try {
                pedidoProveedorRepository.saveAll(pedidos);
            } catch (Exception e) {
                // Manejar la excepción (por ejemplo, registrar el error)
                System.err.println("Error al actualizar los pedidos de proveedor: " + e.getMessage());
            }
        }

        private void actualizarPedidosEntregadosProveedor(LocalDate fecha) {
            List<PedidoProveedor> pedidos = pedidoProveedorRepository.findByFechaEnvioAndEstadoPedido(fecha, EstadoPedido.ENVIADO);

            for (PedidoProveedor pedido : pedidos) {
                pedido.setEstadoPedido(EstadoPedido.ENTREGADO);
                ProductoPedidoProveedor productoPedidoProveedor = productoPedidoProveedorRepository.encontrarUnProductosPedidoPorId(pedido.getId());
                Producto producto = productoRepository.encontrarProductosPorId(productoPedidoProveedor.getPedidoProveedor().getId());
                producto.setCantidad(productoPedidoProveedor.getCantidad());
            }

            try {
                pedidoProveedorRepository.saveAll(pedidos);
            } catch (Exception e) {
                // Manejar la excepción (por ejemplo, registrar el error)
                System.err.println("Error al actualizar los pedidos de proveedor: " + e.getMessage());
            }
        }
    }

