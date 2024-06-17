import axios from "axios";


export const saveDireccion = async ({ tipoVia,domicilio, ciudad, codigoPostal, numero, piso, pais }) => {
    try {
        return await axios.post('http://localhost:9010/api/direccion/crear', {
            tipoVia,
            domicilio,
            ciudad,
            codigoPostal,
            numero,
            piso,
            pais,
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

export const findDireccion = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/direccion/direcciones',
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de la sesión
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
    return null;
}
export const eliminarDireccion = async (direccionId) => {
    try {
        return await axios.delete(`http://localhost:9010/api/direccion/${direccionId}`,
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