import { Route, Routes } from "react-router-dom"
import { FormularioPago } from "../components/FormularioPago"
import { TarjetaProvider } from "../tarjeta/context/TarjetaProvider"

export const RutaPago = () => {
    return (
        <TarjetaProvider>
            <Routes>
                <Route path="/*" element={<FormularioPago />} />
            </Routes>
        </TarjetaProvider>


    )
}