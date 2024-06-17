import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ClienteContext } from '../cliente/context/ClienteContext';
import { AuthContext } from '../auth/context/AuthContext';
import '../css/actualizarDatosGenerales.css';
import logoEmpresa from '../images/logoEmpresa.jpg';
import Swal from 'sweetalert2';

export const ActualizarDatosGenerales = () => {
  const { handlerAddUser, userSelected, validateLettersOnly, validateNumbersOnly } = useContext(ClienteContext);
  const { handlerLogoutSimple } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors: formErrors }, reset, trigger } = useForm({ defaultValues: userSelected });

  const onSubmit = async (data) => {
    try {
      const result = await Swal.fire({
        title: 'Cambiar Datos Cliente',
        text: '¿Seguro que quieres Actualizar los datos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cambiar',
      });

      if (result.isConfirmed) {
        await handlerAddUser({ ...userSelected, ...data });
        reset();
        Swal.fire('Éxito!', 'Datos actualizados correctamente, vuelva a iniciar sesión!', 'success');
        await handlerLogoutSimple();
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while adding user!', 'error');
    }
  };

  return (
    <div className="container registro-formulario-cliente">
      <img src={logoEmpresa} alt="Logo Empresa" className="logo-empresa" />
      <h2 className="text-center">Actualizar Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-table">
        <table className="table">
          <tbody>
            <tr>
              <td><label htmlFor="nombre" className="form-label">Nombre:</label></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  {...register('nombre', { required: 'Campo obligatorio', validate: validateLettersOnly })}
                  onBlur={() => trigger('nombre')}
                />
                {formErrors.nombre && <p className="text-danger">{formErrors.nombre.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="primerApellido" className="form-label">Primer Apellido:</label></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="primerApellido"
                  {...register('primerApellido', { required: 'Campo obligatorio', validate: validateLettersOnly })}
                  onBlur={() => trigger('primerApellido')}
                />
                {formErrors.primerApellido && <p className="text-danger">{formErrors.primerApellido.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="segundoApellido" className="form-label">Segundo Apellido:</label></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="segundoApellido"
                  {...register('segundoApellido', { required: 'Campo obligatorio', validate: validateLettersOnly })}
                  onBlur={() => trigger('segundoApellido')}
                />
                {formErrors.segundoApellido && <p className="text-danger">{formErrors.segundoApellido.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="telefono" className="form-label">Teléfono:</label></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  maxLength="9"
                  {...register('telefono', { required: 'Campo obligatorio', validate: validateNumbersOnly })}
                  onBlur={() => trigger('telefono')}
                />
                {formErrors.telefono && <p className="text-danger">{formErrors.telefono.message}</p>}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary my-2">Actualizar</button>
      </form>
    </div>
  );
};
