import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClienteContext } from '../cliente/context/ClienteContext';
import '../css/actualizarCorreo.css';
import logoEmpresa from '../images/logoEmpresa.jpg';
import { AuthContext } from '../auth/context/AuthContext';

export const ActualizarCorreo = () => {
    const { handlerAddUser, userSelected, validateEmail, checkEmailAvailability } = useContext(ClienteContext);
    const { handlerLogoutSimple } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({ defaultValues: { email: userSelected.email } });

    const onSubmit = async (data) => {
        try {
            const result = await Swal.fire({
                title: "Cambiar Correo",
                text: "¿Seguro que quieres modificar el correo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, cambiar"
            });

            if (result.isConfirmed) {
                console.log("Inicio de actualización de correo");
                await handlerAddUser({ ...userSelected, email: data.email });
                console.log("Correo actualizado en la base de datos");
                await Swal.fire('Éxito!', 'Correo actualizado correctamente, vuelva a iniciar sesión!', 'success');
                console.log("Ejecutando logout");
                handlerLogoutSimple();
            }
        } catch (error) {
            Swal.fire('Error!', 'Ocurrió un error al actualizar el correo!', 'error');
        }
    };

    return (
        <div className="actualizarCorreo-container">
            <img src={logoEmpresa} alt="Logo de la Empresa" className="actualizarCorreo-logo" />
            <h2 className="actualizarCorreo-title">Actualizar Correo</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="actualizarCorreo-form">
                <div>
                    <label htmlFor="email" className="actualizarCorreo-label">Nuevo Correo:</label>
                    <input
                        type="email"
                        className="actualizarCorreo-input"
                        id="email"
                        {...register("email", { required: "Campo obligatorio", validate: { emailFormat: validateEmail, emailAvailability: checkEmailAvailability } })}
                        onBlur={() => trigger("email")}
                    />
                    {errors.email && <p className="actualizarCorreo-error">{errors.email.message}</p>}
                </div>
                <button type="submit" className="actualizarCorreo-button">Actualizar Correo</button>
            </form>
        </div>
    );
};
