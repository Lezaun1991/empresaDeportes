import axios from "axios";


export const savePedido = async ({ productosCantidad, direccionId, total }) => {
    try {
        return await axios.post('http://localhost:9010/api/pedido/crear', {
            productosCantidad, 
            direccionId, 
            total,

        },
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
            }
        });
    } catch (error) {
        throw error;
    }
}
export const verPedidos = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/pedido', 
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const verPedidosAdmin = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/pedido/proveedores', 
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}