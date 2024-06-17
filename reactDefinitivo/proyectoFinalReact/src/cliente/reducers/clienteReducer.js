
export const clienteReducer = (state = [], action) => {

    switch (action.type) {
        case 'addUser':

            return [
                ...state,
                {
                    ...action.payload,
                }
            ];
        case 'actualizarUsuario':
            return state.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return u;
            });
        case 'cargarClientes':
            return action.payload;

        default:
            return state;
    }
}