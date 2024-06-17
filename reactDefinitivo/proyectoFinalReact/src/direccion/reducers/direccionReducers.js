export const direccionReducers = (state = [], action) => {
    switch (action.type) {
        case 'añadirDireccion':
            return [
                ...state,
                {
                    calle: action.payload.calle,
                    ciudad: action.payload.ciudad,
                    codigoPostal: action.payload.codigoPostal,
                    numero: action.payload.numero,
                    piso: action.payload.piso,
                    pais: action.payload.pais,
                }
            ];
            case 'cargarDirecciones':
                return action.payload;
        default:
            return state;
    }
}