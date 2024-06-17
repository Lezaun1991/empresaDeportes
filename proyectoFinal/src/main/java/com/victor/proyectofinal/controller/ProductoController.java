package com.victor.proyectofinal.controller;

import com.victor.proyectofinal.dto.producto.ProductoDtoView;
import com.victor.proyectofinal.service.serviceInterfaz.ProductoService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Data
@RestController
@RequestMapping("/api/producto")
public class ProductoController {
    private final ProductoService productoService;

    @GetMapping
    public List<ProductoDtoView> listaProductos() {
        return productoService.findAll();
    }
    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<ProductoDtoView>> obtenerProductosPorCategoria(@PathVariable Long id) {
        try {
            List<ProductoDtoView> productos = productoService.encontrarProductosCategoria(id);
            if (productos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(productos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
