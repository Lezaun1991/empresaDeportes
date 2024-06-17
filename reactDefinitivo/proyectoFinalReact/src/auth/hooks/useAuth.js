import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducers";
import Swal from "sweetalert2";
import { loginUsers } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    idAdmin: false,
    user: undefined,
    userId: undefined,
}

const initialLoginForm = {
    username: '',
    password: '',
}

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {
        try {
            const response = await loginUsers({ username, password })
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);

            const user = { username: response.data.username }
            dispatch({
                type: 'login',
                payload: { user, isAdmin: claims.isAdmin },

            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);

            navigate('/catalogo');
        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire('Error Datos', 'Username o password invalidos', 'error')
            } else if (error.response?.status == 403) {
                Swal.fire('Error Acceso', 'No tiene acceso al recurso o permisos', 'error')
            } else {
                throw error;
            }
        }
    }

    const handlerLogout = () => {
        Swal.fire({
            title: "Cerrar session",
            text: "¿Quiere salir de la session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, salir"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'logout',
                });
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('login');
                sessionStorage.removeItem('carrito');
                sessionStorage.clear();
                navigate('/catalogo');
            }
        });

    }
    const handlerLogoutSimple = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('carrito');
        sessionStorage.clear();
    };

    return {
        login,
        initialLoginForm,
        handlerLogoutSimple,
        handlerLogin,
        handlerLogout,

    }
}