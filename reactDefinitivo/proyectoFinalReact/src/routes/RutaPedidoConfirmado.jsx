import { Route, Routes } from "react-router-dom"
import { CompraConfirmada } from "../components/CompraConfirmada";








export const RutaPedidoConfirmado = () => {

    return(
    <Routes>
        <Route  path="/*" element={<CompraConfirmada/>}/>
    </Routes>
    );
}