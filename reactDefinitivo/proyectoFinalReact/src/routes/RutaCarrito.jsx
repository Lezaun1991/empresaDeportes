import { Route, Routes } from "react-router-dom"
import { CarroVista } from "../components/CarroVista"
import { useContext } from "react";
import { ProductoContext } from "../producto/context/ProductoContext";

export const RutaCarrito = () => {
    
    return (
        <Routes>
            <Route path="/*" element={<CarroVista />} />
        </Routes>
    )
}