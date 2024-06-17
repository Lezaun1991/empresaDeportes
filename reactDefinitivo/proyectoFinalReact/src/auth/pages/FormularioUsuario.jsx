import React, { useContext } from 'react';
import { ClienteContext } from '../../cliente/context/ClienteContext';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import '../../css/formularioUsuario.css';
import logoEmpresa from '../../images/logoEmpresa.jpg';

export const FormularioUsuario = () => {
  const { 
    handlerAddUser,
    initialUserForm,
    validarLetrasYEspacios,
    validateNumbersOnly,
    validateEmail,
    checkUsernameAvailability,
    checkEmailAvailability,
    usernameAvailable,
    emailAvailable } = useContext(ClienteContext);
  const { register, handleSubmit, formState: { errors: formErrors }, reset, getValues, trigger } = useForm({ defaultValues: initialUserForm });

  const onSubmit = async (data) => {
    try {
      await handlerAddUser(data);
      reset();
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while adding user!', 'error');
    }
  };

  const validateConfirmPassword = (value) => {
    const password = getValues("password");
    return value === password || "Las contraseñas no coinciden";
  };

  return (
    <div className="contenedor-formulario-cliente">
      <img src={logoEmpresa} alt="Logo Empresa" className="formulario-logo" />
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario-tabla">
        <table className="table">
          <tbody>
            <tr>
              <td><label htmlFor="username" className="formulario-etiqueta">Username:</label></td>
              <td>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="formulario-control"
                    id="username"
                    {...register("username", {
                      required: "Campo obligatorio",
                      minLength: { value: 6, message: 'El Username debe tener al menos 6 caracteres' },
                      validate: { usernameAvailable: checkUsernameAvailability }
                    })}
                    onBlur={() => trigger("username")}
                  />
                  {usernameAvailable && (!formErrors.username) ? <i className="bi bi-check-circle-fill text-success formulario-icono-exito"></i> : ""}
                </div>
                {formErrors.username && <p className="text-danger">{formErrors.username.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="email" className="formulario-etiqueta">Email:</label></td>
              <td>
                <div className="d-flex align-items-center">
                  <input
                    type="email"
                    className="formulario-control"
                    id="email"
                    {...register("email", { required: "Campo obligatorio", validate: { emailFormat: validateEmail, emailAvailability: checkEmailAvailability } })}
                    onBlur={() => trigger("email")}
                  />
                  {emailAvailable ? <i className="bi bi-check-circle-fill text-success formulario-icono-exito"></i> : ""}
                </div>
                {formErrors.email && <p className="text-danger">{formErrors.email.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="nombre" className="formulario-etiqueta">Nombre:</label></td>
              <td>
                <input
                  type="text"
                  className="formulario-control"
                  id="nombre"
                  {...register("nombre", { required: "Campo obligatorio", validate: validarLetrasYEspacios })}
                  onBlur={() => trigger("nombre")}
                />
                {formErrors.nombre && <p className="text-danger">{formErrors.nombre.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="primerApellido" className="formulario-etiqueta">Primer Apellido:</label></td>
              <td>
                <input
                  type="text"
                  className="formulario-control"
                  id="primerApellido"
                  {...register("primerApellido", { required: "Campo obligatorio", validate: validarLetrasYEspacios })}
                  onBlur={() => trigger("primerApellido")}
                />
                {formErrors.primerApellido && <p className="text-danger">{formErrors.primerApellido.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="segundoApellido" className="formulario-etiqueta">Segundo Apellido:</label></td>
              <td>
                <input
                  type="text"
                  className="formulario-control"
                  id="segundoApellido"
                  {...register("segundoApellido", { required: "Campo obligatorio", validate: validarLetrasYEspacios })}
                  onBlur={() => trigger("segundoApellido")}
                />
                {formErrors.segundoApellido && <p className="text-danger">{formErrors.segundoApellido.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="telefono" className="formulario-etiqueta">Teléfono:</label></td>
              <td>
                <input
                  type="text"
                  className="formulario-control"
                  id="telefono"
                  maxLength="9"
                  {...register("telefono", { required: "Campo obligatorio", validate: validateNumbersOnly })}
                  onBlur={() => trigger("telefono")}
                />
                {formErrors.telefono && <p className="text-danger">{formErrors.telefono.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="password" className="formulario-etiqueta">Contraseña:</label></td>
              <td>
                <input
                  type="password"
                  className="formulario-control"
                  id="password"
                  {...register("password", {
                    required: 'Campo obligatorio',
                    minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                      message: 'La contraseña debe ser alfanumérica'
                    }
                  })}
                  onBlur={() => trigger("password")}
                />
                {formErrors.password && <p className="text-danger">{formErrors.password.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="confirmPassword" className="formulario-etiqueta">Repetir Contraseña:</label></td>
              <td>
                <div className="d-flex align-items-center">
                  <input
                    type="password"
                    className="formulario-control"
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: 'Campo obligatorio',
                      validate: validateConfirmPassword,
                    })}
                    onBlur={() => trigger("confirmPassword")}
                  />
                  {formErrors.confirmPassword && (
                    <i className={`bi ${formErrors.confirmPassword ? 'bi-x-circle-fill text-danger formulario-icono-error' : 'bi-check-circle-fill text-success formulario-icono-exito'}`}></i>
                  )}
                </div>
                {formErrors.confirmPassword && <p className="text-danger">{formErrors.confirmPassword.message}</p>}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="formulario-boton">Registrarse</button>
      </form>
    </div>
  );
};
