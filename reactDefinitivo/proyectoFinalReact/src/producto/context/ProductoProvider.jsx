import { useProductos } from "../hooks/useProductos";
import { ProductoContext } from "./ProductoContext";


export const ProductoProvider = ({ children }) => {

    const {  cartItems,
        productos,
        handlerDecrementProductCart,
        handlerAddProductCart,
        handlerDeleteItem,
        buscarProductosPorCategoria,
        resetCart,
        buscarProductos,categorias } = useProductos();

    return (
        <ProductoContext.Provider value={
            {
                cartItems,
                productos,
                categorias,
                resetCart,
                buscarProductos,
                buscarProductosPorCategoria,
                handlerDecrementProductCart,
                handlerAddProductCart,
                handlerDeleteItem,
            }
        }>
            {children}
        </ProductoContext.Provider>
    )

}