package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.dto.tarjeta.TarjetaViewDto;
import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.Tarjeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TarjetaRepository extends JpaRepository<Tarjeta,Long> {
    @Query("select t from Tarjeta t where t.cliente.id = ?1")
    Set<Tarjeta> buscarTodasLasTarjetas(Long id);
}
