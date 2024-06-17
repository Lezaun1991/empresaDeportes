import { Route, Routes } from "react-router-dom"
import { ActualizarCorreo } from "../components/ActualizarCorreo"

export const RutaActualizarCorreo = () => {

    return (
        <Routes>
            <Route path="/*" element={<ActualizarCorreo />} />
        </Routes>
    )
}