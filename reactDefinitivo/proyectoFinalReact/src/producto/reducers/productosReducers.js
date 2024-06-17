// reducers/productosReducers.js
export const productosReducer = (state = [], action) => {
    switch (action.type) {
        case 'loadingProduct':
            return action.payload;

        case 'AddProductCart':
            const existingProductIndex = state.findIndex(item => item.id === action.payload.id && item.fechaPedido === action.payload.fechaPedido);
            if (existingProductIndex >= 0) {
                return state.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [
                    ...state,
                    { ...action.payload, cantidad: 1 }
                ];
            }

        case 'UpdateQuantityProductCart':
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        cantidad: item.cantidad + 1,
                    };
                }
                return item;
            });

        case 'DeleteProductCart':
            return state.filter((item) => item.id !== action.payload);

        case 'DecrementQuantityProductCart':
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        cantidad: item.cantidad - 1,
                    };
                }
                return item;
            });
        case 'ResetCart':
            // Implementación para resetear el carrito
            return [];

        default:
            return state;
    }
};
