import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {

    const { login, handlerLogin, handlerLogout, handlerLogoutSimple, initialLoginForm } = useAuth();

    return (
        <AuthContext.Provider value={
            {
                login,
                initialLoginForm,
                handlerLogoutSimple,
                handlerLogin,
                handlerLogout,
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}