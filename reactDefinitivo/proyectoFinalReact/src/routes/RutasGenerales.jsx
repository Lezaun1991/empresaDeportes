import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from '../auth/pages/LoginPage';
import { FormularioUsuario } from "../auth/pages/FormularioUsuario";
import { RutaCatalogo } from "./RutaCatalogo";
import { RutaCarrito } from "./RutaCarrito";
import { Navbar } from "../components/layout/Navbar";
import { RutaDireccion } from "./RutaDireccion";
import { Footer } from "../components/layout/Footer";
import { RutaPago } from "./RutaPago";
import { RutaConfirmacion } from "./RutaConfirmacion";
import { RutaPedidoConfirmado } from "./RutaPedidoConfirmado";
import { RutaPedidos } from "./RutaPedidos";
import { RutaActualizarUsername } from "./RutaActualizarUsername";
import { RutaActualizarCorreo } from "./RutaActualizarCorreo";
import { RutaActualizarDatosGenerales } from "./RutaActualizarDatosGenerales";
import { ListaCatalogo } from "../components/ListaCatalogo";

export const RutasGenerales = () => {
    return (
        <div id="tamaño-footer">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="catalogo/*" element={<RutaCatalogo />} />
                    <Route path="categoria/:id" element={<ListaCatalogo />} />
                    <Route path="direccion/*" element={<RutaDireccion />} />
                    <Route path="pago/*" element={<RutaPago />} />
                    <Route path="confirmar/*" element={<RutaConfirmacion />} />
                    <Route path="cart/*" element={(<RutaCarrito />)} />
                    <Route path="detalles-pedido/*" element={(<RutaPedidos />)} />
                    <Route path="actualizar-username/*" element={(<RutaActualizarUsername />)} />
                    <Route path="actualizar-correo/*" element={(<RutaActualizarCorreo />)} />
                    <Route path="actualizar-datos-generales/*" element={(<RutaActualizarDatosGenerales />)} />
                    <Route path="compra/confirmada/*" element={(<RutaPedidoConfirmado />)} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path="/" element={<Navigate to={'/catalogo'} />} />
                    <Route path="/cliente/registro" element={<FormularioUsuario />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}
