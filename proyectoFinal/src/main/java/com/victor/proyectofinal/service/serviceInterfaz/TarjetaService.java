package com.victor.proyectofinal.service.serviceInterfaz;

import com.victor.proyectofinal.dto.tarjeta.TarjetaCreateDto;
import com.victor.proyectofinal.dto.tarjeta.TarjetaViewDto;
import com.victor.proyectofinal.entity.Tarjeta;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TarjetaService {

    Tarjeta save(TarjetaCreateDto tarjetaCreateDto);

    Set<TarjetaViewDto> buscarTarjetas() throws Exception;

    void delete (Long id);
}
