package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.entity.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface DireccionRepository extends JpaRepository<Direccion, Long> {

    @Query("SELECT d FROM Direccion d WHERE d.cliente.id=?1 AND d.activo=true")
    Set<Direccion> buscarDireccionesId(Long id);

    @Query("SELECT d FROM Direccion d WHERE d.id=?1")
    Direccion buscarUnaDireccion(Long id);

    @Query("SELECT d FROM Direccion d WHERE d.administrador=true")
    Direccion buscarDireccionAdmin();

    Optional<Direccion> findByTipoViaAndCiudadAndDomicilioAndPisoAndNumeroAndPaisAndCodigoPostalAndClienteIdAndActivo(
            String tipoVia, String ciudad, String domicilio, String piso, String numero, String pais, String codigoPostal, Long clienteId, Boolean activo);
}
