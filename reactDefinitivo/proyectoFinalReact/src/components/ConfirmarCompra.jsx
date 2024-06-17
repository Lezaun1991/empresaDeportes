import React, { useContext } from 'react';
import { PedidoContext } from '../pedido/context/PedidoContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../css/confirmarCompra.css';
import logoEmpresa from '../images/logoEmpresa.jpg';

export const ConfirmarCompra = () => {
    const { hacerPedido } = useContext(PedidoContext);
    const navigate = useNavigate();
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const direccion = JSON.parse(sessionStorage.getItem('direccionPedido')) || {};
    const datosTarjeta = JSON.parse(sessionStorage.getItem('tarjetaPedido')) || {};

    const calcularTotal = () => {
        return carrito.reduce((acumulador, producto) => {
            return acumulador + (producto.precio * producto.cantidad);
        }, 0);
    };

    const total = calcularTotal();

    const handleConfirmarCompra = async () => {
        const productosCantidad = carrito.reduce((acc, producto) => {
            acc[producto.id] = producto.cantidad;
            return acc;
        }, {});

        const pedido = {
            productosCantidad,
            direccionId: direccion.id,
            total,
        };

        try {
            await hacerPedido(pedido);
            const factura = {
                nombreCliente: direccion.nombreCliente,
                primerApellidoCliente: direccion.primerApellidoCliente,
                segundoApellidoCliente: direccion.segundoApellidoCliente,
                tipoVia: direccion.tipoVia,
                domicilio: direccion.domicilio,
                numero: direccion.numero,
                piso: direccion.piso,
                ciudad: direccion.ciudad,
                codigoPostal: direccion.codigoPostal,
                telefonoCliente: direccion.telefonoCliente,
                emailCliente: direccion.emailCliente,
                nombreCompletoTitular: datosTarjeta.nombreCompletoTitular,
                numeroTarjeta: datosTarjeta.numeroTarjeta,
                fechaExpiracion: datosTarjeta.fechaExpiracion,
                carrito,
                total,
            };
            console.log("Redirigiendo a compra/confirmada con factura:", factura);
            navigate('/compra/confirmada', { state: { factura } });
        } catch (error) {
            console.error('Detalles del error:', error);
            Swal.fire('Error', `Error inesperado al crear el pedido: ${error.message}`, 'error');
        }
    };

    return (
        <div className="confirmar-compra-container">
            <div className="confirmar-compra-header">
                <img src={logoEmpresa} alt="Logo de la Empresa" />
                <h2>Factura</h2>
            </div>
            
            <div className="confirmar-compra-section">
                <h3>Datos del cliente</h3>
                <p><strong>Nombre Completo:</strong> {`${direccion.nombreCliente} ${direccion.primerApellidoCliente} ${direccion.segundoApellidoCliente}`}</p>
                <p><strong>Dirección:</strong> {`${direccion.tipoVia}, ${direccion.domicilio} ${direccion.numero}, ${direccion.piso} ${direccion.ciudad} (${direccion.codigoPostal})`}</p>
                <p><strong>Teléfono:</strong> {direccion.telefonoCliente}</p>
                <p><strong>Email:</strong> {direccion.emailCliente}</p>
            </div>

            <div className="confirmar-compra-section">
                <h3>Datos de pago</h3>
                <p><strong>Titular de la tarjeta:</strong> {datosTarjeta.nombreCompletoTitular}</p>
                <p><strong>Número de tarjeta:</strong> {datosTarjeta.numeroTarjeta}</p>
                <p><strong>Fecha de vencimiento:</strong> {datosTarjeta.fechaExpiracion}</p>
            </div>

            <div className="confirmar-compra-section">
                <h3>Resumen del pedido</h3>
                <table className="confirmar-compra-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio.toFixed(2)}€</td>
                                <td>{producto.cantidad}</td>
                                <td>{(producto.precio * producto.cantidad).toFixed(2)}€</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className="confirmar-compra-total">Total</td>
                            <td>{total.toFixed(2)}€</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleConfirmarCompra} className="confirmar-compra-button">Confirmar Compra</button>
            </div>
        </div>
    );
};
