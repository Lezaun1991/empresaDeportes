import { useContext } from "react";
import { ProductoTarjeta } from "./ProductoTarjeta";
import { ProductoContext } from "../producto/context/ProductoContext";

export const ListaCatalogo = () => {
    const { productos } = useContext(ProductoContext);

    return (
        <div className="producto-tarjeta-row">
            {productos.map(produc => (
                <ProductoTarjeta
                    key={`${produc.id}-${produc.fechaPedido}-${produc.pedidoId}`}
                    id={produc.id}
                    nombre={produc.nombre}
                    descripcion={produc.descripcion}
                    precio={produc.precio}
                    descuento={produc.descuento}
                    precioDescuento={produc.precioDescuento}
                    proveedor={produc.proveedor}
                    cantidad={produc.cantidad}
                    imagenProducto={`http://localhost:9010${produc.imagenProducto}`}
                    fechaPedido={produc.fechaPedido} // Añadir fechaPedido aquí
                    pedidoId={produc.pedidoId} // Añadir pedidoId aquí
                />
            ))}
        </div>
    );
};
