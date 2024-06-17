import { Route, Routes } from "react-router-dom"
import { ListaPedidos } from "../components/ListaPedidos"
import { PedidoProvider } from "../pedido/context/PedidoProvider"

export const RutaPedidos = () => {

    return (
        <PedidoProvider>
            <Routes>
                <Route path="/*" element={<ListaPedidos />} />
            </Routes>
        </PedidoProvider>
    )
}