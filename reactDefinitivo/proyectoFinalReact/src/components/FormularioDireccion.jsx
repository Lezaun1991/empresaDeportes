import { useContext, useState } from "react";
import { DireccionContext } from "../direccion/context/DireccionContext";
import { ClienteContext } from "../cliente/context/ClienteContext"
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import '../css/formularioDireccion.css';
import logoEmpresa from '../images/logoEmpresa.jpg';
import { TipoVia } from "./TipoVia";

export const FormularioDireccion = () => {
    const { addDireccion, direccion, initialDireccionForm, handlerEliminarDireccion } = useContext(DireccionContext);
    const { validarLetrasYEspacios, validateNumbersOnly } = useContext(ClienteContext)
    const { register, handleSubmit, formState: { errors: formErrors }, reset } = useForm({ defaultValues: initialDireccionForm });
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [botonPulsado, setBotonPulsado] = useState(false);
    const navigate = useNavigate();

    const onClickBoton = () => {
        setBotonPulsado(true);
    };

    const cambiarEstado = () => {
        setBotonPulsado(false);
    };

    const onSubmit = async (data) => {
        try {
            await addDireccion(data);
            cambiarEstado();
            reset();
        } catch (error) {
            console.error("Error al agregar dirección", error);
            setError("Error al registrar dirección");
        }
    };

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };

    const agregarDireccionAlPedido = () => {
        if (selectedCardIndex !== null) {
            const direccionSeleccionada = direccion[selectedCardIndex];
            sessionStorage.setItem('direccionPedido', JSON.stringify(direccionSeleccionada));
            navigate('/pago');
        } else {
            Swal.fire('Selecciona Dirección', 'No se ha seleccionado ninguna dirección para agregar al pedido!', 'warning');
        }
    };

    const eliminarDireccionEnvio = () => {
        if (selectedCardIndex !== null) {
            const direccionSeleccionada = direccion[selectedCardIndex];
            handlerEliminarDireccion(direccionSeleccionada.id);
        }
    };



    return (
        <div className="container formulario-direccion">
            <div className="text-center mt-5">
                <img src={logoEmpresa} alt="Logo Empresa" className="logo-empresa" />
                <h2>Dirección de Envío</h2>
            </div>
            {!botonPulsado && (
                <div className="row">
                    {direccion.map((direccion, index) => (
                        <div key={index} className="col-md-4 mb-3" onClick={() => handleCardClick(index)}>
                            <div className={`card h-100 d-flex flex-column justify-content-between ${index === selectedCardIndex ? 'selected' : ''}`}>
                                <div className="card-body">
                                    <p className="card-text"><strong>Tipo de vía:</strong> {direccion.tipoVia}</p>
                                    <p className="card-text"><strong>Domicilio:</strong> {direccion.domicilio}</p>
                                    <p className="card-text"><strong>Ciudad:</strong> {direccion.ciudad}</p>
                                    <p className="card-text"><strong>Código Postal:</strong> {direccion.codigoPostal}</p>
                                    <p className="card-text"><strong>Número:</strong> {direccion.numero}</p>
                                    <p className="card-text"><strong>Piso:</strong> {direccion.piso}</p>
                                    <p className="card-text"><strong>País:</strong> {direccion.pais}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 d-flex flex-column justify-content-between">
                            <div className="card-body">
                                <h5 className="card-title">Agregar Nueva Dirección</h5>
                                <p className="card-text">Haz clic aquí para agregar una nueva dirección</p>
                                <button className="btn btn-primary" onClick={onClickBoton}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {selectedCardIndex !== null && !botonPulsado && (
                <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-lg w-100 mb-2" onClick={agregarDireccionAlPedido}>
                            Añadir Dirección Al Pedido
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-danger btn-lg w-100" onClick={eliminarDireccionEnvio}>
                            Eliminar Dirección
                        </button>
                    </div>
                </div>
            )}
            {botonPulsado && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <table className="table custom-table">
                        <tbody>
                            <tr>
                                <td><label htmlFor="tipoVia" className="form-label" >Tipo de Vía:</label></td>
                                <td>
                                    <TipoVia register={register} errors={formErrors} id="tipoVia" />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="domicilio" className="form-label">domicilio:</label></td>
                                <td>
                                    <input className="form-control" type="text" id="domicilio" {...register("domicilio", { required: "Campo obligatorio", validate: validarLetrasYEspacios })} />
                                    {formErrors.domiclio && <p className="text-danger">{formErrors.domicilio.message}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="ciudad" className="form-label">Ciudad:</label></td>
                                <td>
                                    <input className="form-control" type="text" id="ciudad" {...register("ciudad", { required: "Campo obligatorio", validate: validarLetrasYEspacios })} />
                                    {formErrors.ciudad && <p className="text-danger">{formErrors.ciudad.message}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="codigoPostal" className="form-label">Código Postal:</label></td>
                                <td>
                                    <input className="form-control" type="text" id="codigoPostal" maxLength="5" {...register("codigoPostal", { required: "Campo obligatorio", validate: validateNumbersOnly })} />
                                    {formErrors.codigoPostal && <p className="text-danger">{formErrors.codigoPostal.message}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="numero" className="form-label">Número Portal:</label></td>
                                <td>
                                    <input className="form-control" type="text" id="numero" {...register("numero", { required: "Campo obligatorio", validate: validateNumbersOnly })} />
                                    {formErrors.numero && <p className="text-danger">{formErrors.numero.message}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="piso" className="form-label">Piso:</label></td>
                                <td>
                                    <input className="form-control" type="text" id="piso" {...register("piso", { required: "Campo obligatorio" })} />
                                    {formErrors.piso && <p className="text-danger">{formErrors.piso.message}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="pais" className="form-label">País:</label></td>
                                <td>
                                    <input className="form-control" type="text" id="pais" {...register("pais", { required: "Campo obligatorio", validate: validarLetrasYEspacios })} />
                                    {formErrors.pais && <p className="text-danger">{formErrors.pais.message}</p>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-primary btn-lg" type="submit">Guardar Dirección</button>
                        <button className="btn btn-secondary btn-lg" type="button" onClick={cambiarEstado}>Cancelar</button>
                    </div>
                </form>
            )}
        </div>
    );
};
