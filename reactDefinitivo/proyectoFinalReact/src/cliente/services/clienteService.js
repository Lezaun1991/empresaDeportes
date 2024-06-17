import axios from "axios"


export const findAllClientes = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/cliente');
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
}
export const save = async ({ username, email, password, nombre, primerApellido, segundoApellido, telefono }) => {
    try {
        return await axios.post('http://localhost:9010/api/cliente/crear', {
            username,
            email,
            password,
            nombre,
            primerApellido,
            segundoApellido,
            telefono
        });
    } catch (error) {
        throw error;
    }
}
export const actualizarDatosCliente = async ({ username,email,nombre,primerApellido,segundoApellido,telefono }) => {
    try {
        return await axios.patch('http://localhost:9010/api/cliente/actualizar', {
            username,
            email,
            nombre,
            primerApellido,
            segundoApellido,
            telefono
        },
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
                }
            });
    } catch (error) {
        throw error;
    }
};

export const obtenerClientePorToken = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/cliente/obtener', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el cliente por token:', error.response ? error.response.data : error.message);
        throw error;
    }
};
