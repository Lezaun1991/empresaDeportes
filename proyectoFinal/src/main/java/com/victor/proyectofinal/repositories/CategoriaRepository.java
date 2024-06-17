package com.victor.proyectofinal.repositories;

import com.victor.proyectofinal.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    @Query("SELECT DISTINCT c FROM Categoria c")
    List<Categoria> findDistinctCategoria();
}
