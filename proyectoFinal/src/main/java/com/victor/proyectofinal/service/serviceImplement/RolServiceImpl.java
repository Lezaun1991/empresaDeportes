package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.entity.Rol;
import com.victor.proyectofinal.repositories.RolRepository;
import com.victor.proyectofinal.service.serviceInterfaz.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class   RolServiceImpl implements RolService {
    private final RolRepository rolRepository;

    @Override
    public Optional<Rol> findByNombre(String s) {
        return rolRepository.findByNombre(s);
    }
}
