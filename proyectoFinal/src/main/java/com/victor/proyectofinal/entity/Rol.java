package com.victor.proyectofinal.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
@Getter
@Setter
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String nombre;
    //@JsonIgnoreProperties("roles")
    // @JsonIgnore

    @JsonIgnore
  @ManyToMany(mappedBy = "rols")
//    //@JsonBackReference(value = "cliente-rol")
 private Set<Cliente> clientes = new HashSet<>();

}
