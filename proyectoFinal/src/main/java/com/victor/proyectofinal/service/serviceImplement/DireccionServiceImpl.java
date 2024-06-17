package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.dto.direccion.DireccionDto;
import com.victor.proyectofinal.dto.direccion.DireccionMapper;
import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.Direccion;
import com.victor.proyectofinal.repositories.ClienteRepository;
import com.victor.proyectofinal.repositories.DireccionRepository;
import com.victor.proyectofinal.security.UserDetailsServiceImpl;
import com.victor.proyectofinal.service.serviceInterfaz.ClienteService;
import com.victor.proyectofinal.service.serviceInterfaz.DireccionService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DireccionServiceImpl implements DireccionService {
    private final DireccionRepository direccionRepository;
    private final ClienteService clienteService;
    private final DireccionMapper direccionMapper;

    @Override
    public Direccion save(DireccionDto direccionDto) {
        Direccion direccion = direccionMapper.toEntity(direccionDto);
        Cliente cliente = clienteService.obtenerClientePorToken();

        Optional<Direccion> existingDireccion = direccionRepository.findByTipoViaAndCiudadAndDomicilioAndPisoAndNumeroAndPaisAndCodigoPostalAndClienteIdAndActivo(
                direccion.getTipoVia(), direccion.getCiudad(), direccion.getDomicilio(), direccion.getPiso(),
                direccion.getNumero(), direccion.getPais(), direccion.getCodigoPostal(), cliente.getId(), false);

        if (existingDireccion.isPresent()) {
            // Si existe, se reactiva
            Direccion direccionInactiva = existingDireccion.get();
            direccionInactiva.setActivo(true);
            return direccionRepository.save(direccionInactiva);
        } else {
            cliente.getDirecciones().add(direccion);
            direccion.setCliente(cliente);
            direccion.setAdministrador(false);
            return direccionRepository.save(direccion);
        }
    }

    @Override
    public Set<DireccionDto> buscarDireccionesId() {

        Cliente cliente = clienteService.obtenerClientePorToken();
        Set<Direccion> direcciones = direccionRepository.buscarDireccionesId(cliente.getId());
        Set<DireccionDto> direccion = direccionMapper.toDtoSet(direcciones);
        for (DireccionDto direc: direccion) {
            direc.setNombreCliente(cliente.getNombre());
            direc.setPrimerApellidoCliente(cliente.getPrimerApellido());
            direc.setSegundoApellidoCliente(cliente.getSegundoApellido());
            direc.setTelefonoCliente(cliente.getTelefono());
            direc.setEmailCliente(cliente.getEmail());
        }
        return direccion;
    }

    @Transactional
    public void deleteActive(Long id) {
        Direccion direccion = direccionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Dirección no encontrada con id: " + id));
        direccion.setActivo(false);
        direccionRepository.save(direccion);  // Guardar el cambio
    }
}
