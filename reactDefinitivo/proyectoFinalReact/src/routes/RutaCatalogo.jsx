import { Route, Routes } from "react-router-dom"
import { ListaCatalogo } from "../components/ListaCatalogo"

export const RutaCatalogo = () => {
    return (
        <Routes>
            <Route path="/*" element={<ListaCatalogo />} />
        </Routes>
    )
}