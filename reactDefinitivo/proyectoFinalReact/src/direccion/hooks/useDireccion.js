import { useEffect, useReducer, useState } from "react";
import { direccionReducers } from "../reducers/direccionReducers";
import { useNavigate } from "react-router-dom";
import { eliminarDireccion, findDireccion, saveDireccion } from "../services/direccionServices";
import Swal from "sweetalert2";

const initialDireccion = [];

const initialDireccionForm = {
    id: 0,
    calle: '',
    numero: '',
    pais: '',
    piso: '',
    codigoPostal: '',
    ciudad: '',
}



export const useDireccion = () => {

    const [direccion, dispatch] = useReducer(direccionReducers, initialDireccion);
    const [direccionSelected, setDireccionSelected] = useState(initialDireccionForm);
    const navigate = useNavigate();


    // Función para recuperar los objetos de la base de datos
    const buscarDirecciones = async () => {
        try {
            // Aquí obtienes los datos de la base de datos
            // Supongamos que tienes una función llamada `fetchProductosFromDatabase`
            const direccionesBackend = await findDireccion();
            dispatch({ type: 'cargarDirecciones', payload: direccionesBackend });
        } catch (error) {
            console.error('Error al obtener las direcciones:', error);
        }
    };

    useEffect(() => {
        buscarDirecciones();
    }, []);

    const handlerEliminarDireccion = async (direccionId) => {
        try {
            const result = await Swal.fire({
                title: "Eliminar Direccion",
                text: "¿Seguro que quieres eliminarla?, este paso es irreversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, Eliminar"
            });
            if (result.isConfirmed) {
                await eliminarDireccion(direccionId);
            }
            await buscarDirecciones();
        } catch (error) {
            
        }
    }

    const addDireccion = async (direcci) => {
        let response;
        try {
            if (direcci.id === 0) {
                response = await saveDireccion(direcci);
                console.log("CONFIRMAMOS RESPONSE " + response)
            } else {
                //response = await updateDireccion(direccion);
                console.log("PEPITO")
            }

            dispatch({
                type: (direcci.id === 0) ? 'añadirDireccion' : 'actualizarDireccion',
                payload: response,
            });

            buscarDirecciones();

            Swal.fire(
                (direcci.id === 0) ?
                    'Dirección Creada' :
                    'Dirección Actualizada',
                (direcci.id === 0) ?
                    'La Dirección ha sido creado con exito!' :
                    'La Dirección ha sido actualizado con exito!',
                'success'
            );

            navigate('/direccion');

        } catch (error) {
            if (error.response?.status === 403) {
                const errorMessage = error.response.data?.message || 'Acceso prohibido';
                Swal.fire('Error dirección', errorMessage, 'error');
            } else {
                Swal.fire('Error', error.message || 'Error inesperado', 'error');
            }

        }
    }
    const handlerDireccionSelectedForm = (direccion) => {
        setDireccionSelected({ ...direccion });
    }
    return {
        addDireccion,
        handlerDireccionSelectedForm,
        buscarDirecciones,
        handlerEliminarDireccion,
        direccion,
        initialDireccionForm,
        direccionSelected,
    }

}