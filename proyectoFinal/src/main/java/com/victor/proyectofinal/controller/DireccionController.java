package com.victor.proyectofinal.controller;

import com.victor.proyectofinal.dto.direccion.DireccionDto;
import com.victor.proyectofinal.service.serviceInterfaz.DireccionService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@Data
@RestController
@RequestMapping("/api/direccion")
public class DireccionController {
    private final DireccionService direccionService;

    @PostMapping("/crear")
    public ResponseEntity<?> create(@Valid @RequestBody DireccionDto direccionDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(direccionService.save(direccionDto));
    }
    @GetMapping("/direcciones")
    public ResponseEntity<?> obtenerDireccionId() {
        try{
            return new ResponseEntity<>(direccionService.buscarDireccionesId(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarDireccion(@PathVariable Long id) {
        try {
            direccionService.deleteActive(id);
            return new ResponseEntity<>("Dirección marcada como inactiva exitosamente", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar la dirección", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
