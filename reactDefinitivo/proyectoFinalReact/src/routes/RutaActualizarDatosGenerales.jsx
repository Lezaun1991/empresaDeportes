import { Route, Routes } from "react-router-dom"
import { ActualizarDatosGenerales } from "../components/ActualizarDatosGenerales"

export const RutaActualizarDatosGenerales = () => {
    return (
        <Routes>
            <Route path="/*" element={<ActualizarDatosGenerales />}  />
        </Routes>
    )
}