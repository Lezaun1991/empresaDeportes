export const pedidoReducer = (state = [], action) => {

    switch (action.type) {
        case 'addPedido':
            return [
                {
                    ...action.payload,
                }
            ]
        case 'cargarPedidos':
            return action.payload;
        default:
            return state;
    }
}