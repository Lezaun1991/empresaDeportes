import { useCliente } from "../hooks/useCliente";
import { ClienteContext } from "./ClienteContext";

export const ClienteProvider = ({ children }) => {

    const {
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
    } = useCliente();

    return (
        <ClienteContext.Provider value={
            {
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
        }>
            {children}
        </ClienteContext.Provider>
    )
}