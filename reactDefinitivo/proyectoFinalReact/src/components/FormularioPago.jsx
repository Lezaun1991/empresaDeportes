import { useContext, useState } from "react";
import { TarjetaContext } from "../tarjeta/context/TarjetaContext";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import '../css/formularioPago.css'; // Importar el CSS personalizado
import logoEmpresa from '../images/logoEmpresa.jpg';
import { ClienteContext } from "../cliente/context/ClienteContext";

export const FormularioPago = () => {
  // Otros estados
  const { guardarTarjeta, tarjetas, initialTarjetaForm, handlerEliminarTarjeta } = useContext(TarjetaContext);
  const { register, handleSubmit, formState: { errors: formErrors }, reset, setValue, clearErrors } = useForm({ defaultValues: initialTarjetaForm });
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [guardar, setGuardar] = useState(false);
  const {validarLetrasYEspacios, validateNumbersOnly} = useContext(ClienteContext)
  const [botonPulsado, setBotonPulsado] = useState(false);
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);//Obtiene el mes actual

  // Función para manejar el cambio en el campo de fecha de expiración
  const handleFechaExpiracionChange = (event) => {
    let input = event.target.value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean números
    const formattedInput = input
      .replace(/(\d{2})(\d)/, '$1/$2') // Añade una barra después de los primeros dos caracteres
      .replace(/(\d{2})\/(\d{2}).*/, '$1/$2'); // Limita a dos dígitos para el mes y dos dígitos para el año
    setValue('fechaExpiracion', formattedInput); // Establece el valor formateado en el estado del formulario
    setFechaExpiracion(formattedInput); // Actualiza el estado local de la fecha de expiración
    clearErrors('fechaExpiracion', { type: 'required' }); // Limpia cualquier error previo asociado con el campo de fecha de expiración
  };

  // Validar fecha de expiración
  const validateFechaExpiracion = (value) => {
    const [month, year] = value.split('/').map(num => parseInt(num, 10)); // Separa el mes y el año y los convierte a enteros
    const currentFullYear = new Date().getFullYear(); // Obtiene el año actual completo
    const inputFullYear = 2000 + year; // Asume que el año está en formato 'yy' y lo convierte a 'yyyy'

    if (inputFullYear < currentFullYear || (inputFullYear === currentFullYear && month < currentMonth)) {
      return 'Fecha de expiración no válida'; // Retorna un mensaje de error si la fecha es inválida
    }
    return true; // Retorna true si la fecha es válida
  };

  // Función para manejar el clic en las tarjetas
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  console.log("TarjetaSeleccionada " + selectedCardIndex)
  // Función para agregar el pago al pedido
  const agregarPagoAlPedido = () => {
    if (selectedCardIndex !== null) {
      const tarjetaSeleccionada = tarjetas[selectedCardIndex];
      tarjetaSeleccionada.numeroTarjeta = tarjetaSeleccionada.numeroTarjeta.replace(/\d(?=\d{4})/g, "*")
      tarjetaSeleccionada.numeroSecreto = tarjetaSeleccionada.numeroSecreto.replace(/\d/g, "*")
      sessionStorage.setItem('tarjetaPedido', JSON.stringify(tarjetaSeleccionada));
      console.log("Tarjeta agregada al pedido:", tarjetaSeleccionada);
      navigate('/confirmar')
    } else {
      console.error("No se ha seleccionado ninguna dirección para agregar al pedido.");
    }
  };

  const cambiarEstado = () => {
    setBotonPulsado(false);
  }; 

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      if (guardar) {
        await guardarTarjeta(data);
        reset();
        onClose();
        console.log('Tarjeta guardada:', data);
      } else {
        sessionStorage.setItem('tarjeta', JSON.stringify(data));
        console.log('Tarjeta guardada en sesión:', data);
      }
      setGuardar(false);
    } catch (error) {
      console.error("Error al agregar la tarjeta", error);
      setError("Error al registrar la tarjeta");
    }
  };

  const navigate = useNavigate();

  // Función para manejar el clic en el botón de agregar nueva tarjeta
  const onClickBoton = () => {
    setBotonPulsado(true);
  };

  // Función para cerrar el botón
  const onClose = () => {
    setBotonPulsado(false);
  };

   const eliminarMetodoPago = () => {
    if (selectedCardIndex !== null) {
      const tarjetaSeleccionada = tarjetas[selectedCardIndex];
      handlerEliminarTarjeta(tarjetaSeleccionada.id);
   }
  };

  return (
    <div className="custom-container mt-5">
      <img src={logoEmpresa} alt="Logo Empresa" className="custom-logo" />
      <div className="custom-card">
        <div className="custom-card-body">
          <h5 className="custom-card-title text-center">
            <i className="fas fa-credit-card"></i> Agregar Tarjeta de Crédito
          </h5>

          {!botonPulsado &&
            <div className="row">
              {tarjetas.map((tarjeta, index) => (
                <div key={index} className="col-md-3 mb-3" onClick={() => handleCardClick(index)}>
                  <div className={`card h-100 d-flex flex-column justify-content-between ${index === selectedCardIndex ? 'selected-card' : ''}`}>
                    <div className="card-body">
                      <p className="card-text"><strong>Titular Tarjeta:</strong> {tarjeta.nombreCompletoTitular}</p>
                      <p className="card-text"><strong>Numero Tarjeta:</strong> {tarjeta.numeroTarjeta}</p>
                      <p className="card-text"><strong>Fecha de Expiración:</strong> {tarjeta.fechaExpiracion}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-md-3 mb-3">
                <div className="card h-100 d-flex flex-column justify-content-between">
                  <div className="card-body text-center">
                    <h5 className="card-title">Agregar Nueva Tarjeta</h5>
                    <button className="btn btn-primary mt-3 add-card-btn" onClick={onClickBoton}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }

          {selectedCardIndex !== null && !botonPulsado &&
            <div className="row justify-content-center mt-3">
              <div className="col-md-4">
                <button className="btn btn-primary btn-block" onClick={agregarPagoAlPedido}>
                  Añadir Tarjeta Al Pedido
                </button>
              </div>
              <div className="col-md-4">
                <button className="btn btn-danger btn-block" onClick={eliminarMetodoPago}>
                  Eliminar Tarjeta
                </button>
              </div>
            </div>
          }

          {botonPulsado && (
            <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label htmlFor="nombreCompletoTitular" className="form-label">Nombre Completo Titular Tarjeta</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Jorge Garcia Garcia"
                          id="nombreCompletoTitular"
                          {...register("nombreCompletoTitular", { required: "Campo obligatorio", validate: validarLetrasYEspacios })}
                        />
                        {formErrors.nombreCompletoTitular && <p className="text-danger">{formErrors.nombreCompletoTitular.message}</p>}
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label htmlFor="numeroTarjeta" className="form-label">Número de Tarjeta</label>
                        <input
                          type="text"
                          className="form-control"
                          maxLength="16"
                          id="numeroTarjeta"
                          placeholder="1234 5678 9012 3456"
                          {...register("numeroTarjeta", { required: "Campo obligatorio", validate: validateNumbersOnly })}
                        />
                        {formErrors.numero && <p className="text-danger">{formErrors.numero.message}</p>}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label htmlFor="fechaExpiracion" className="form-label">Fecha de Expiración</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/AA"
                          maxLength="5" // Limitar a 5 caracteres (MM/AA)
                          id="fechaExpiracion"
                          {...register('fechaExpiracion', {
                            required: 'Campo obligatorio',
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                              message: 'Formato de fecha inválido (MM/AA)',
                            },
                            validate: validateFechaExpiracion
                          })}
                          onChange={handleFechaExpiracionChange}
                        />
                        {formErrors.fechaExpiracion && <p className="text-danger">{formErrors.fechaExpiracion.message}</p>}
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label htmlFor="numeroSecreto" className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          pattern="\d{3}"
                          placeholder="123"
                          maxLength="3"
                          id="numeroSecreto"
                          {...register("numeroSecreto", { required: "Campo obligatorio", validate: validateNumbersOnly })}
                        />
                        {formErrors.numeroSecreto && <p className="text-danger">{formErrors.numeroSecreto.message}</p>}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="guardar"
                          checked={guardar}
                          onChange={(e) => setGuardar(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="guardar">
                          ¿Quieres guardar la tarjeta?
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button type="submit" className="btn btn-primary btn-block">Agregar Tarjeta</button>
                      <button className="btn btn-secondary btn-lg" type="button" onClick={cambiarEstado}>Cancelar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
