import { useTarjeta } from "../hooks/useTarjeta"
import { TarjetaContext } from "./TarjetaContext";

export const TarjetaProvider = ({ children }) => {
    const {
        tarjetas,
        initialTarjetaForm,
        handlerEliminarTarjeta,
        buscarTarjetas,
        guardarTarjeta, } = useTarjeta();

    return (
        <TarjetaContext.Provider value={
            {
                tarjetas,
                initialTarjetaForm,
                handlerEliminarTarjeta,
                buscarTarjetas,
                guardarTarjeta,
            }
        }>
            {children}
        </TarjetaContext.Provider>
    )

}