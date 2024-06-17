import { Route, Routes } from "react-router-dom"
import { ConfirmarCompra } from "../components/ConfirmarCompra"
import { PedidoProvider } from "../pedido/context/PedidoProvider"

export const RutaConfirmacion = () => {
    return (
        <PedidoProvider>
            <Routes>
                <Route path="/*" element={<ConfirmarCompra />} />
            </Routes>
        </PedidoProvider>
    )
}