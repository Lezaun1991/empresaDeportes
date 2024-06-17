package com.victor.proyectofinal.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cliente")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String username;

    @Column(unique=true)
    private String email;

    private String nombre;

    private String primerApellido;

    private String segundoApellido;

    @JsonIgnore
    @OneToMany(mappedBy = "cliente")
    private Set<Direccion> direcciones;

    private String telefono;

    private String password;
    @OneToMany(mappedBy = "cliente")
    private Set<PedidoCliente> pedido;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "cliente_rol",
            joinColumns = @JoinColumn(name = "cliente_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "rol_id", referencedColumnName = "id"))
    //@JsonManagedReference(value = "cliente-rol")
    private Set<Rol> rols = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    private Set<Tarjeta> tarjetas;


}

