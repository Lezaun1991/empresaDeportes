import { Route, Routes } from "react-router-dom"
import { FormularioDireccion } from "../components/FormularioDireccion"
import { DireccionProvider } from "../direccion/context/DireccionProvider"

export const RutaDireccion = () => {

    return (
        <DireccionProvider>
            <Routes>
                <Route path="/*" element={<FormularioDireccion />} />
            </Routes>
        </DireccionProvider>

    )
}