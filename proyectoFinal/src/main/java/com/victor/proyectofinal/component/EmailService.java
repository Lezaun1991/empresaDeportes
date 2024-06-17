package com.victor.proyectofinal.component;

import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.PedidoCliente;
import com.victor.proyectofinal.entity.Producto;
import com.victor.proyectofinal.entity.ProductoPedidoCliente;
import com.victor.proyectofinal.repositories.ProductoPedidoClienteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

@Slf4j

@Component
public class EmailService {

    @Autowired
    private ProductoPedidoClienteRepository productoPedidoClienteRepository;
    private final JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void enviarCorreoConfirmacion(PedidoCliente pedido, Cliente cliente) {
        log.info("Iniciando el método enviarCorreoConfirmacion");
        SimpleMailMessage mensaje = new SimpleMailMessage();
        List<ProductoPedidoCliente> productos = productoPedidoClienteRepository.encontrarProductosPedidoPorId(pedido.getId());
        StringBuilder nombresProductos = new StringBuilder("Listado Productos: " + "\n");

        for (ProductoPedidoCliente producto : productos) {
            nombresProductos.append(producto.getProducto().getNombre()).append("\n");
        }

        log.info("Nombres de productos concatenados: {}", nombresProductos);

        // Elimina la última coma y el espacio extra
        if (nombresProductos.length() > "Listado Productos: \n".length()) {
            nombresProductos.delete(nombresProductos.length() - 1, nombresProductos.length());
        }

        log.info("Nombres de productos después de eliminar el último salto de línea: {}", nombresProductos);

        mensaje.setTo(cliente.getEmail());
        mensaje.setSubject("Confirmación de Pedido");
        mensaje.setText("Estimado/a " + cliente.getNombre() + ' ' + cliente.getPrimerApellido() + ' ' + cliente.getSegundoApellido() + ",\n\n"
                + "Gracias por realizar su pedido con nosotros. Aquí están los detalles de la compra:\n\n"
                + "Fecha del pedido: " + pedido.getFechaPedido() + "\n\n"
                + nombresProductos + "\n\n"
                + "Precio total compra: " + pedido.getTotal() + "\n\n"
                + "Dirección de entrega: " + pedido.getDireccion().getTipoVia() + ' '
                + pedido.getDireccion().getDomicilio() + ' ' + pedido.getDireccion().getNumero()
                + ' ' + pedido.getDireccion().getPiso()
                + ' ' + pedido.getDireccion().getCodigoPostal()
                + ' ' + pedido.getDireccion().getCiudad() + "\n\n"
                + "Identificador único de pedido: " + pedido.getId() + "\n\n"
                + "Saludos cordiales,\n"
                + "Tu equipo de ventas");

        log.info("Enviando el correo a {}", cliente.getEmail());

        emailSender.send(mensaje);
        log.info("Correo enviado exitosamente");
    }
}
