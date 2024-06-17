package com.victor.proyectofinal.controller;


import com.victor.proyectofinal.dto.tarjeta.TarjetaCreateDto;
import com.victor.proyectofinal.dto.tarjeta.TarjetaViewDto;
import com.victor.proyectofinal.service.serviceInterfaz.TarjetaService;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Slf4j
@Data
@RestController
@RequestMapping("/api/tarjeta")
public class TarjetaController {
    private final TarjetaService tarjetaService;

    @PostMapping("/crear")
    public ResponseEntity<?> create(@RequestBody TarjetaCreateDto tarjetaCreateDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tarjetaService.save(tarjetaCreateDto));
    }
    @GetMapping
    public Set<TarjetaViewDto> obtenerTajetasDeCliente() throws Exception {
        return tarjetaService.buscarTarjetas();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTarjeta(@PathVariable Long id) {
        try {
            tarjetaService.delete(id);
            return new ResponseEntity<>("Tarjeta eliminada exitosamente", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar la tarjeta", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
