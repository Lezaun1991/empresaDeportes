import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductoContext } from "../producto/context/ProductoContext";
import { calculateTotal } from "../producto/services/productService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import '../css/carroVista.css'; // Importa el archivo CSS

export const CarroVista = () => {
    const { handlerDeleteItem, handlerDecrementProductCart, cartItems, handlerAddProductCart,productos } = useContext(ProductoContext);

    console.log("CarroVista" + cartItems)
    const recorrerProductos = (id) => {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === id) {
                return productos[i];
            }
        }
        return null;
    }

    const navigate = useNavigate();

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(calculateTotal(cartItems));
    }, [cartItems]);

    const onDeleteProduct = (id) => {
        handlerDeleteItem(id);
    }

    const onCatalog = () => {
        navigate('/catalogo');
    }

    const onCheckout = () => {
        navigate('/direccion');
    };

    const incrementQuantity = (productId) => {
        const objectoIncrementado = recorrerProductos(productId);
        const product = cartItems.find((item) => item.id === productId);
        if (objectoIncrementado.cantidad > product.cantidad) {
            handlerAddProductCart({ ...product, cantidad: product.cantidad + 1 });
        } else {
            Swal.fire({
                title: "Sin Stock!",
                text: "No nos queda Stock de ese producto!",
                icon: "error"
            });
        }
    };

    const decrementQuantity = (productId) => {
        const product = cartItems.find((item) => item.id === productId);
        if (product.cantidad >= 1) {
            handlerDecrementProductCart(productId);
        }
    };

    return (
        <div className="carro-vista">
            {cartItems.length <= 0 ? (
                <div className="alert alert-warning mt-5">No hay productos en el carrito de compras</div>
            ) : (
                <>
                    <h3>Carro de compras</h3>
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Proveedor</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item,index) => (
                                <tr key={`${item.id}-${item.fechaPedido}-${index}`}>
                                    <td>{item.nombre}</td>
                                    <td>{item.precio.toFixed(2)}€</td>
                                    <td>{item.proveedor}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary btn-icon"
                                            onClick={() => decrementQuantity(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        {item.cantidad}
                                        <button
                                            className="btn btn-secondary btn-icon"
                                            onClick={() => incrementQuantity(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </td>
                                    <td>{(item.cantidad * item.precio).toFixed(2)}€</td>
                                    <td>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => onDeleteProduct(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="me-2" />
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="total-container">
                        Total: {total.toFixed(2)}€
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-secondary-lg"
                            onClick={onCatalog}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            Seguir Comprando
                        </button>
                        <button
                            className="btn btn-primary btn-primary-lg"
                            onClick={onCheckout}
                        >
                            Tramitar Compra
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
