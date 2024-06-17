package com.victor.proyectofinal.controller;

import com.victor.proyectofinal.dto.cliente.ClienteCreateDto;
import com.victor.proyectofinal.dto.cliente.ClienteMapper;
import com.victor.proyectofinal.dto.cliente.ClienteUpdateCorreoUsernameDto;
import com.victor.proyectofinal.dto.cliente.ClienteViewDto;
import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.service.serviceInterfaz.ClienteService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@Slf4j
@Data
@RestController
@RequestMapping("/api/cliente")
public class ClienteController {

    private final ClienteService clienteService;
    private final ClienteMapper clienteMapper;

    @PostMapping("/crear")
    public ResponseEntity<?> create(@Valid @RequestBody ClienteCreateDto cliente,
                                    BindingResult result) {
        if(result.hasErrors()){
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clienteService.save(cliente));
    }

    @GetMapping
    public ResponseEntity<?> obtenerClientes(){
        try{
            return new  ResponseEntity<>(clienteService.findAll(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/actualizar")
    public ResponseEntity<?> actualizar(@Valid @RequestBody ClienteUpdateCorreoUsernameDto clienteUpdateCorreoUsernameDto, BindingResult result){
        if (clienteUpdateCorreoUsernameDto == null)
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        try{
            clienteService.actualizarCliente(clienteUpdateCorreoUsernameDto);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<>(Collections.singletonMap("error", e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/obtener")
    public ResponseEntity<?> getClienteToken() {
        Cliente cliente = clienteService.obtenerClientePorToken();
        ClienteViewDto clienteViewDto = clienteMapper.toDtoVista(cliente);
        return ResponseEntity.ok(clienteViewDto);
    }




    private ResponseEntity<?> validation(BindingResult result) {
        Map<String,String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}

