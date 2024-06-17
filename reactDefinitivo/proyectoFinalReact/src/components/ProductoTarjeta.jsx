import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductoContext } from "../producto/context/ProductoContext";
import { AuthContext } from "../auth/context/AuthContext";
import Swal from "sweetalert2";
import "../css/productoTarjeta.css";

export const ProductoTarjeta = ({
    id,
    fechaPedido,
    pedidoId,
    nombre,
    descripcion,
    precio,
    precioDescuento,
    descuento, proveedor,
    cantidad,
    imagenProducto }) => {
    const { handlerAddProductCart } = useContext(ProductoContext);
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const onAddProduct = (product) => {
        const precioFinal = product.descuento ? product.precioDescuento : product.precio;
        // Crear un nuevo objeto de producto con el precio actualizado
        const productoConPrecioFinal = { ...product, precio: precioFinal };
        if (product.cantidad > 0) {
            handlerAddProductCart(productoConPrecioFinal);
            navigate('/cart');
        } else {
            Swal.fire({
                title: "Sin Stock!",
                text: "No nos queda Stock de ese producto!",
                icon: "error"
            });
        }
    }

    return (
        <div className="producto-tarjeta-col-4">
            <div className="producto-tarjeta-card">
                <img src={imagenProducto} className="producto-tarjeta-card-img-top" alt={nombre} />
                <div className="producto-tarjeta-card-body">
                    <h5 className="producto-tarjeta-card-title">{nombre}</h5>
                    <p className="producto-tarjeta-card-text">{descripcion}</p>
                    <p className="producto-tarjeta-card-text">{proveedor}</p>
                    {cantidad === 0 ? null : (
                        descuento ? (
                            <div>
                                <p className="producto-tarjeta-card-price" style={{ textDecoration: 'line-through', fontWeight: 'bold' }}>
                                    ${precio.toFixed(2)}
                                </p>
                                <p className="producto-tarjeta-card-price" style={{ color: 'red' }}>
                                    OFERTA ${precioDescuento.toFixed(2)}
                                </p>
                            </div>
                        ) : (
                            <p className="producto-tarjeta-card-price">${precio.toFixed(2)}</p>
                        )
                    )}
                    {cantidad > 0 ? (
                        login.isAuth ? (
                            <button className="producto-tarjeta-btn-primary" onClick={() => onAddProduct({ id, nombre, descripcion, precio, precioDescuento, descuento, proveedor, cantidad, imagenProducto, fechaPedido, pedidoId })}>
                                Agregar
                            </button>
                        ) : (
                            <p className="producto-tarjeta-alert-info">Inicie Sesion para agregar al carrito</p>
                        )
                    ) : (
                        <p className="producto-tarjeta-alert-danger">No hay stock</p>
                    )}
                </div>
            </div>
        </div>
    );
};
