import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RegistrationLink } from "./RegistroUsuario";
import { Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import '../../css/loginPage.css';
import logoEmpresa from '../../images/logoEmpresa.jpg';

export const LoginPage = () => {

    const { handlerLogin, login, initialLoginForm } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors: formErrors }, reset } = useForm({ defaultValues: initialLoginForm });

    const onSubmit = (data) => {
        const { username, password } = data;
        handlerLogin({ username, password });
        if (login.isAuth) {
            Navigate('/'); 
        }
        reset();
    }

    return (
        <div className="login-page__container">
            <div className="login-page__modal">
                <div className="login-page__modal-dialog">
                    <div className="login-page__modal-content">
                        <div className="login-page__modal-header">
                            <img src={logoEmpresa} alt="Logo Empresa" className="login-page__logo" />
                            <h5 className="login-page__modal-title">Login Page</h5>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-page__modal-body">
                                <input className="login-page__form-control"
                                    placeholder="Username"
                                    id='username'
                                    name='username'
                                    {...register("username")}
                                    />
                                <input className="login-page__form-control"
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    {...register("password")}
                                    />
                            </div>
                            <div className="login-page__modal-footer">
                                <button
                                    type="submit"
                                    className="login-page__btn-primary">
                                    Login
                                </button>
                            </div>
                            <RegistrationLink />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
