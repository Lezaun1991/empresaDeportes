import { useDireccion } from "../hooks/useDireccion"
import { DireccionContext } from "./DireccionContext";

export const DireccionProvider = ({ children }) => {

    const {
        addDireccion,
        handlerDireccionSelectedForm,
        buscarDirecciones,
        handlerEliminarDireccion,
        direccion,
        initialDireccionForm,
        direccionSelected,
    } = useDireccion();

    return (
        <DireccionContext.Provider value={
            {
                addDireccion,
                handlerDireccionSelectedForm,
                buscarDirecciones,
                handlerEliminarDireccion,
                direccion,
                initialDireccionForm,
                direccionSelected,
            }
        }>
            {children}
        </DireccionContext.Provider>
    )

}