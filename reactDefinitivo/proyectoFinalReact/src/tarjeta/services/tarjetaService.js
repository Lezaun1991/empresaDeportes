import axios from "axios";

export const saveTarjeta = async ({ numeroTarjeta, numeroSecreto, fechaExpiracion, nombreCompletoTitular }) => {
    try {
        return await axios.post('http://localhost:9010/api/tarjeta/crear', {
            numeroTarjeta, 
            numeroSecreto, 
            fechaExpiracion,
            nombreCompletoTitular,

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
export const findAllTarjetas = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/tarjeta',
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
            }
        });
        return response.data;    
    } catch (error) {
       console.log(error); 
    }
    return null;
}
export const eliminarTarjeta = async (tarjetaId) => {
    try {
        return await axios.delete(`http://localhost:9010/api/tarjeta/${tarjetaId}`,
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
            }
        });
    } catch (error) {
        console.log(error); 
    }
    return null;
}