import { Route, Routes } from "react-router-dom"
import { ActualizarUsername } from "../components/ActualizarUsername"

export const RutaActualizarUsername = () => {

    return (
        <Routes>
            <Route path="/*" element={<ActualizarUsername />} />
        </Routes>
    )
}