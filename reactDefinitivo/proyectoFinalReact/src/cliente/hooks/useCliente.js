import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteReducer } from "../reducers/clienteReducer";
import { actualizarDatosCliente, findAllClientes, obtenerClientePorToken, save } from "../services/clienteService";
import { AuthContext } from "../../auth/context/AuthContext";

const initialCliente = [];

const initialUserForm = {
    id: 0,
    username: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    email: '',
}

export const useCliente = () => {
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [clientes, dispatch] = useReducer(clienteReducer, initialCliente);
    const { login } = useContext(AuthContext);
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const navigate = useNavigate();


    const obtenerClientes = async () => {
        try {
            const clientes = await findAllClientes();
            dispatch({ type: 'cargarClientes', payload: clientes });
            console.log("Clientes obtenidos:", JSON.stringify(clientes, null, 2));
        } catch (error) {
            if (error.clientes?.status === 404) {
                Swal.fire('Error Clientes', 'Clientes no encontrados', 'error');
            } else if (error?.clientes.status === 500) {
                Swal.fire('Error Servicio', 'Error con la conexión al servidor', 'error');
            } else {
                Swal.fire('Error', error.message || 'Error inesperado', 'error');
            }
        }
    };

    const obtenerClienteAutenticado = async () => {
        try {
            const cliente = await obtenerClientePorToken();
            setUserSelected(cliente);
            console.log("Cliente autenticado:", cliente);
        } catch (error) {
            Swal.fire('Error', 'No se pudo obtener el cliente autenticado', 'error');
        }
    };

    useEffect(() => {
        obtenerClientes();
        if (login.isAuth) {
            obtenerClienteAutenticado();
        }
    }, [login.isAuth]);

    // Obtener el ID del cliente autenticado después de cargar los clientes


    const handlerAddUser = async (user) => {
        let response;
        try {
            if (user.id === 0) {
                response = await save(user);
            } else {
                response = await actualizarDatosCliente(user);
            }



            obtenerClientes();

            Swal.fire(
                (user.id === 0) ?
                    'Usuario Creado' :
                    'Usuario Actualizado',
                (user.id === 0) ?
                    'El usuario ha sido creado con exito!' :
                    'El usuario ha sido actualizado con exito!',
                'success'
            );
            navigate('/catalogo')
        } catch (error) {
            console.error('Error al guardar al cliente:', error);
            Swal.fire('Error!', 'Ocurrió un error al agregar el cliente!', 'error');
        }
    }



    const validarLetrasYEspacios = (value) => {
        return /^[a-zA-ZÀ-ÿ\s]+$/.test(value) || "Este campo solo puede contener letras y espacios";
    };


    const validateNumbersOnly = (value) => {
        return /^[0-9]+$/.test(value) || "Este campo solo puede contener números";
    };

    const validateEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Por favor, introduce un correo electrónico válido";
    };

    const checkUsernameAvailability = (value) => {
        if (clientes === null) {
            return;
        } else {
            const isAvailable = !clientes.some(cliente => cliente.username === value);
            setUsernameAvailable(isAvailable);
            return isAvailable ? true : "Este username ya está registrado";
        }
    };

    const checkEmailAvailability = (value) => {
        if (clientes === null) {
            return;
        } else {
            const isAvailable = !clientes.some(cliente => cliente.email === value);
            setEmailAvailable(isAvailable);
            return isAvailable ? true : "Este correo ya está registrado";
        }
    };

    const handlerUserSelectedForm = (user) => {
        setUserSelected({ ...user });
    }

    return {
        userSelected,
        initialUserForm,
        clientes,
        usernameAvailable,
        emailAvailable,
        validarLetrasYEspacios,
        validateNumbersOnly,
        validateEmail,
        handlerAddUser,
        checkEmailAvailability,
        checkUsernameAvailability,
        handlerUserSelectedForm,
    }
}
