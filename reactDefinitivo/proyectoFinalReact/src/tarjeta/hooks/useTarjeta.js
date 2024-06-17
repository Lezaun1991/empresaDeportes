import { useEffect, useReducer, useState } from "react";
import { tarjetaReducer} from "../reducers/tarjetaReducer";
import { useNavigate } from "react-router-dom";
import { eliminarTarjeta, findAllTarjetas, saveTarjeta } from "../services/tarjetaService";
import Swal from "sweetalert2";

const initialTarjeta = [];

const initialTarjetaForm = {
    id: 0,
    nombreCompletoTitular: '',
    numeroTarjeta: '',
    numeroSecreto: '',
    fechaExpiracion: '',
}

export const useTarjeta = () => {

    const[tarjetas, dispatch] = useReducer(tarjetaReducer, initialTarjeta)
    const navigate = useNavigate();

    const buscarTarjetas = async () => {
        try {
            const tarjetasBackend = await findAllTarjetas();
            dispatch({ type: 'cargarTarjetas', payload: tarjetasBackend });
        } catch (error) {
            console.error('Error al obtener los productos de la base de datos:', error);
        }
    }

    const handlerEliminarTarjeta = async (tarjetaId) => {
        try {
            const result = await Swal.fire({
                title: "Eliminar Tarjeta",
                text: "¿Seguro que quieres eliminarla?, este paso es irreversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, Eliminar"
            });
            if (result.isConfirmed) {
                await eliminarTarjeta(tarjetaId);
            }
            await buscarTarjetas();
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        buscarTarjetas();
    },[])

    const guardarTarjeta = async (tarjeta) => {

        let response;
        try {
            if(tarjeta.id === 0){
                response = await saveTarjeta(tarjeta);
                console.log("TARJETA " + response)
            }
            dispatch({
                type: 'addTarjeta',
                payload: response,
            });
            buscarTarjetas();
            Swal.fire(
                'Tarjeta Creada',
                'La Tarjeta ha sido creado con exito!', 
                'success'
                );
            navigate('/pago');
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrors(error.response.data);
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {
            
                if (error.response.data?.message?.includes('UK_username')) {
                    setErrors({username: 'El username ya existe!'})
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    setErrors({email: 'El email ya existe!'})
                }
                
            } else {
                throw error;
            }
        }
    }
    

    return {
        tarjetas,
        handlerEliminarTarjeta,
        initialTarjetaForm,
        buscarTarjetas,
        guardarTarjeta, 
    }
    
}