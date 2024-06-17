export const tarjetaReducer = (state = [], action) => {

    switch (action.type) {
        case 'addTarjeta':

            return [
                {
                    ...action.payload,
                }
            ];
        case 'cargarTarjetas':
            return action.payload;
        default:
            return state;
    }
}