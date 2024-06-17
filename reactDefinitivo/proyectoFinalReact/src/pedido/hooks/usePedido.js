import { useContext, useEffect, useReducer, useState } from "react";
import { pedidoReducer } from "../reducers/pedidoReducer";
import { useNavigate } from "react-router-dom";
import { savePedido, verPedidos, verPedidosAdmin } from "../services/pedidoService";
import { ProductoContext } from "../../producto/context/ProductoContext";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext";


const initalPedido = [];

export const usePedido = () => {
    const [pedido, dispatch] = useReducer(pedidoReducer, initalPedido);
    const { buscarProductos,resetCart } = useContext(ProductoContext);
    const {login} = useContext(AuthContext);
    const[pedidosAdmin,setPedidosAdmin] = useState([]);
    
    const navigate = useNavigate();

    const buscarPedidos = async () => {
        try {
            // Aquí obtienes los datos de la base de datos
            // Supongamos que tienes una función llamada `fetchProductosFromDatabase`
            const pedidosBackend = await verPedidos();
            dispatch({ type: 'cargarPedidos', payload: pedidosBackend });
        } catch (error) {
            console.error('Error al obtener las direcciones:', error);
        }
    };

    const buscarPedidosProveedoresAdmin = async () => {
        try {
            const pedidosBackendAdmin = await verPedidosAdmin();
            setPedidosAdmin(pedidosBackendAdmin);
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);
        }
    }

    useEffect(() => {
        buscarPedidos();
        buscarPedidosProveedoresAdmin();
    }, []);

    

    const hacerPedido = async (pedido) => {
        let response;
        try {
            response = await savePedido(pedido);
            dispatch({
                type: 'addPedido',
                payload: response,
            });
            await buscarProductos();
            await buscarPedidos();
            await resetCart();
            
            Swal.fire(
                'Pedido Realizado',
                'El pedido ha sido creado con éxito!', 
                'success'
            );
            navigate('/compra/confirmada');
        } catch (error) {
            console.error('Detalles del error:', error);
            Swal.fire('Error', `Error inesperado: ${error.message}`, 'error');
        }
    };
    console.log("PEDIDOS" + pedido);
    return {
        pedidosAdmin,
        hacerPedido,
        buscarPedidos,
        pedido,
    };
};
