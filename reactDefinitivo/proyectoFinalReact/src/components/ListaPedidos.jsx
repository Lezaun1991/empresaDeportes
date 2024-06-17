import React, { useContext } from 'react';
import { PedidoContext } from '../pedido/context/PedidoContext';
import '../css/listaPedidos.css';
import { AuthContext } from '../auth/context/AuthContext';


export const ListaPedidos = () => {
    const { pedido, pedidosAdmin } = useContext(PedidoContext);
    const{login} = useContext(AuthContext);

    return (
        <>
        {login.isAdmin ? <div className="lista-pedidos-container lista-pedidos-mt-5">
                <div className="lista-pedidos-pedidos-container">
                    {pedidosAdmin.map((pedid, index) => (
                        <div className="lista-pedidos-card lista-pedidos-shadow-sm" key={index}>
                            <div className="lista-pedidos-card-header">
                                <h3>Detalles del Pedido #{pedid.id}</h3>
                            </div>
                            <div className="lista-pedidos-card-body">
                                <h5 className="lista-pedidos-card-title">Identificador Pedido: {pedid.id}</h5>
                                <p className="lista-pedidos-card-text"><strong>Fecha del Pedido:</strong> {pedid.fechaPedido}</p>
                                <p className="lista-pedidos-card-text"><strong>Fecha del Envio:</strong> {pedid.fechaEnvio}</p>
                                <p className="lista-pedidos-card-text"><strong>Estado del Pedido:</strong> {pedid.estadoPedido}</p>
                                <p className="lista-pedidos-card-text"><strong>Total:</strong> ${pedid.total.toFixed(2)}</p>
                                <hr className="lista-pedidos-hr" />
                                <h5>Productos</h5>
                                <table className="lista-pedidos-table lista-pedidos-table-striped">
                                    <thead>
                                        <tr>
                                            <th className="lista-pedidos-th" scope="col">Producto</th>
                                            <th className="lista-pedidos-th" scope="col">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedid.nombreProducto.map((producto, prodIndex) => (
                                            <tr key={prodIndex}>
                                                <td className="lista-pedidos-td">{producto}</td>
                                                <td className="lista-pedidos-td">{pedid.cantidad[prodIndex]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
        </div> : 
        <div className="lista-pedidos-container lista-pedidos-mt-5">
            {pedido.length > 0 ? (
                <div className="lista-pedidos-pedidos-container">
                    {pedido.map((pedid, index) => (
                        <div className="lista-pedidos-card lista-pedidos-shadow-sm" key={index}>
                            <div className="lista-pedidos-card-header">
                                <h3>Detalles del Pedido #{pedid.id}</h3>
                            </div>
                            <div className="lista-pedidos-card-body">
                                <h5 className="lista-pedidos-card-title">Identificador Pedido: {pedid.id}</h5>
                                <p className="lista-pedidos-card-text"><strong>Fecha del Pedido:</strong> {pedid.fechaPedido}</p>
                                <p className="lista-pedidos-card-text"><strong>Fecha del Envio:</strong> {pedid.fechaEnvio}</p>
                                <p className="lista-pedidos-card-text"><strong>Estado del Pedido:</strong> {pedid.estadoPedido}</p>
                                <p className="lista-pedidos-card-text"><strong>Total:</strong> ${pedid.total.toFixed(2)}</p>
                                <hr className="lista-pedidos-hr" />
                                <h5>Productos</h5>
                                <table className="lista-pedidos-table lista-pedidos-table-striped">
                                    <thead>
                                        <tr>
                                            <th className="lista-pedidos-th" scope="col">Producto</th>
                                            <th className="lista-pedidos-th" scope="col">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedid.nombreProducto.map((producto, prodIndex) => (
                                            <tr key={prodIndex}>
                                                <td className="lista-pedidos-td">{producto}</td>
                                                <td className="lista-pedidos-td">{pedid.cantidad[prodIndex]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="lista-pedidos-alert lista-pedidos-alert-warning text-center" role="alert">
                    No ha realizado ningún pedido
                </div>
            )}
        </div>}
        </>
    );
};
