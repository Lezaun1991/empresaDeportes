package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.entity.Rol;

import java.util.Optional;

public interface RolService {
    Optional<Rol> findByNombre(String s);
}
