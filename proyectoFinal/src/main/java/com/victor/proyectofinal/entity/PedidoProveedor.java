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
@Table(name = "pedido_proveedor")
public class PedidoProveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaPedido;
    private LocalDate fechaEnvio;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "Proveedor_ID")
    private Proveedor proveedor;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "direccion_id")
    private Direccion direccion;

    private Double total;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estadoPedido;

    @OneToMany(mappedBy = "pedidoProveedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductoPedidoProveedor> productos;
}
