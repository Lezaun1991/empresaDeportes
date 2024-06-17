import { usePedido } from "../hooks/usePedido"
import { PedidoContext } from "./PedidoContext";


export const PedidoProvider = ({ children }) => {

    const {
        hacerPedido,pedido,buscarPedidos,pedidosAdmin } = usePedido();

    return (
        <PedidoContext.Provider value={
            {

                hacerPedido,
                pedidosAdmin,
                pedido,
                buscarPedidos,
            }
        }>
            {children}
        </PedidoContext.Provider>
    )
}