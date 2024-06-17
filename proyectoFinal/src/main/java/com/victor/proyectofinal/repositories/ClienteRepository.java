package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    Optional<Cliente> findByEmail(String s);

    @Query("select c from Cliente c " +
            "where lower(c.username) = ?1 or lower(c.email) = ?1")
    Optional<Cliente> buscarPorUsernameOEmail(String s);


}
