package com.victor.proyectofinal.entity;

import com.victor.proyectofinal.enumerado.EstadoPedido;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pedido_cliente")
public class PedidoCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaPedido;
    private LocalDate fechaEnvio;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "Cliente_ID")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "direccion_id")
    private Direccion direccion;

    private Double total;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estadoPedido;

    @OneToMany(mappedBy = "pedidoCliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductoPedidoCliente> productos;

}

