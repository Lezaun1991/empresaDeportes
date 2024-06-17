import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import '../css/actualizarUsername.css';
import logoEmpresa from '../images/logoEmpresa.jpg';
import { ClienteContext } from '../cliente/context/ClienteContext';
import { AuthContext } from '../auth/context/AuthContext';

export const ActualizarUsername = () => {
    const { handlerAddUser, userSelected, clientes, checkUsernameAvailability } = useContext(ClienteContext);
    const { handlerLogoutSimple } = useContext(AuthContext);
    
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({ defaultValues: { username: userSelected.username } });
    
    const onSubmit = async (data) => {
        try {
            const result = await Swal.fire({
                title: "Cambiar Username",
                text: "¿Seguro que quieres cambiar el usuario?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, cambiar"
            });
    
            if (result.isConfirmed) {
                await handlerAddUser({ ...userSelected, username: data.username });
                Swal.fire('Éxito!', 'Username actualizado correctamente, vuelva a iniciar sesión!', 'success');
                await handlerLogoutSimple();
            }
        } catch (error) {
            Swal.fire('Error!', 'Ocurrió un error al actualizar el username!', 'error');
        }
    };

    return (
        <div className="update-username-container">
            <img src={logoEmpresa} alt="Logo Empresa" className="update-username-logo" />
            <h2 className="update-username-header">Actualizar Username</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="update-username-form">
                <div className="update-username-form-group">
                    <label htmlFor="username" className="update-username-form-label">Nuevo Username:</label>
                    <input
                        type="text"
                        className="update-username-form-input"
                        id="username"
                        {...register("username", {
                            required: "Campo obligatorio",
                            minLength: {
                                value: 6, message: 'El Username debe tener al menos 6 caracteres',
                            },
                            validate: { usernameAvailable: checkUsernameAvailability }
                        })}
                        onBlur={() => trigger("username")}
                    />
                    {errors.username && <p className="update-username-error-message">{errors.username.message}</p>}
                </div>
                <button type="submit" className="update-username-submit-button">Actualizar Username</button>
            </form>
        </div>
    );
};
