package com.victor.proyectofinal.controller;

import com.victor.proyectofinal.dto.pedido.PedidoCreateClienteDto;
import com.victor.proyectofinal.service.serviceInterfaz.PedidoClienteService;
import com.victor.proyectofinal.service.serviceInterfaz.PedidoProveedorService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Data
@RestController
@RequestMapping("/api/pedido")
public class PedidoController {

    private final PedidoClienteService pedidoService;

    private final PedidoProveedorService pedidoProveedorService;

    @PostMapping("/crear")
    public ResponseEntity<?> crearPedido (@RequestBody PedidoCreateClienteDto pedidoCreateClienteDto){
        return ResponseEntity.ok(pedidoService.save(pedidoCreateClienteDto));
    }
    @GetMapping
    public ResponseEntity<?> mostrarPedidosClientes (){
        return new ResponseEntity<>(pedidoService.mostrarPedidos() ,HttpStatus.OK);
    }

    @GetMapping("/proveedores")
    public ResponseEntity<?> mostrarPedidosProveedores (){
        return new ResponseEntity<>(pedidoProveedorService.mostrarPedidosProveedores() ,HttpStatus.OK);
    }


}
