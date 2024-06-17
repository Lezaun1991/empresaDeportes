package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.entity.ProductoPedidoCliente;
import com.victor.proyectofinal.repositories.ProductoPedidoClienteRepository;
import com.victor.proyectofinal.service.serviceInterfaz.ProductoPedidoClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductoPedidoClienteImpl implements ProductoPedidoClienteService {
    private final ProductoPedidoClienteRepository productoPedidoClienteRepository;

    @Override
    public ProductoPedidoCliente save(ProductoPedidoCliente productoPedidoCliente) {
        return productoPedidoClienteRepository.save(productoPedidoCliente);
    }
}
