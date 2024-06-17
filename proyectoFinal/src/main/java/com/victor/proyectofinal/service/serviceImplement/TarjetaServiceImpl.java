package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.dto.tarjeta.TarjetaCreateDto;
import com.victor.proyectofinal.dto.tarjeta.TarjetaMapper;
import com.victor.proyectofinal.dto.tarjeta.TarjetaViewDto;
import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.Tarjeta;
import com.victor.proyectofinal.repositories.TarjetaRepository;
import com.victor.proyectofinal.service.serviceInterfaz.ClienteService;
import com.victor.proyectofinal.service.serviceInterfaz.TarjetaService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class TarjetaServiceImpl implements TarjetaService {
    private final TarjetaRepository tarjetaRepository;
    private final TarjetaMapper tarjetaMapper;
    private final ClienteService clienteService;

    @Override
    public Tarjeta save(TarjetaCreateDto tarjetaCreateDto) {
        Cliente cliente = clienteService.obtenerClientePorToken();
        Tarjeta nuevaTarjeta = tarjetaMapper.toEntity(tarjetaCreateDto);
        nuevaTarjeta.setCliente(cliente);
        return tarjetaRepository.save(nuevaTarjeta);
    }

    @Override
    public Set<TarjetaViewDto> buscarTarjetas() throws Exception {
        try {
            Cliente cliente = clienteService.obtenerClientePorToken();
            Set<Tarjeta> listaTarjetas = tarjetaRepository.buscarTodasLasTarjetas(cliente.getId());
            return tarjetaMapper.toDtoSet(listaTarjetas);
        } catch (Exception e) {
            throw new Exception("Cliente no encontrado", e);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        Tarjeta tarjetaEliminada = tarjetaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarjeta no encontrada con id: " + id));
        tarjetaRepository.delete(tarjetaEliminada);
    }


}
