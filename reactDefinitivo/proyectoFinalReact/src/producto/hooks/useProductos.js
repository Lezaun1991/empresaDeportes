import { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { productosReducer } from "../reducers/productosReducers";
import { findAll, findAllCategoria, findProductosByCategoriaId } from "../services/productService";


const carritoInicial = JSON.parse(sessionStorage.getItem('carrito')) || [];

export const useProductos = () => {
    const [cartItems, dispatch] = useReducer(productosReducer, carritoInicial);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        sessionStorage.setItem('carrito', JSON.stringify(cartItems))
        console.log("ESTADO DEL CARRITO " + cartItems);

    }, [cartItems])

    const buscarCategorias = async () => {
        try {
          // Aquí obtienes los datos de la base de datos
          // Supongamos que tienes una función llamada `fetchProductosFromDatabase`
          const categoriasBackend = await findAllCategoria();
          setCategorias(categoriasBackend); // Guardar productos en el estado
        } catch (error) {
          console.error('Error al obtener las categorias de la base de datos:', error);
        }
      };

   
   
        // Función para recuperar los objetos de la base de datos
        const buscarProductos = async () => {
          try {
            // Aquí obtienes los datos de la base de datos
            // Supongamos que tienes una función llamada `fetchProductosFromDatabase`
            const productosBackend = await findAll();
            setProductos(productosBackend); // Guardar productos en el estado
          } catch (error) {
            console.error('Error al obtener los productos de la base de datos:', error);
          }
        };

        const buscarProductosPorCategoria = async (categoriaId) => {
            try {
                const productosCategoria = await findProductosByCategoriaId(categoriaId);
                setProductos(productosCategoria);
                
            } catch (error) {
                console.error('Error al obtener los productos de la categoría:', error);
            }
        };

        useEffect(() => {
        // Llamas a la función para cargar los productos cuando el componente se monta
        buscarProductos();
        buscarCategorias();
      }, []);


    const handlerAddProductCart = (product) => {

        const hasItem = cartItems.find((i) => i.id === product.id);
        const stockQuantity = product.cantidad; // Cantidad disponible en el stock
        console.log("CANTIDAD" + product.cantidad);
        
        if (hasItem) {
            const newQuantity = hasItem.cantidad + 1;
            
            if (newQuantity > stockQuantity) {
                // Si la cantidad supera el stock, muestra un mensaje de error
                Swal.fire({
                    title: "Sin Stock!",
                    text: "No nos queda Stock de ese producto!",
                    icon: "error"
                  });
                return; // Detener la operación
            }
            dispatch(
                {
                    type: 'UpdateQuantityProductCart',
                    payload: product,
                }
            );
        } else {
            dispatch(
                {
                    type: 'AddProductCart',
                    payload: product,
                }
            );
        }

    }
    const handlerDecrementProductCart = (id) => {
        const product = cartItems.find((item) => item.id === id);
        console.log("POPEYE " + product.cantidad)
        if (product) {
            if (product.cantidad > 1) {
                dispatch({
                    type: 'DecrementQuantityProductCart',
                    payload: {id},
                });
            } else {
                handlerDeleteItem(id);
            }
        }
    };

    const handlerDeleteItem = (id) => {
        dispatch(
            {
                type: 'DeleteProductCart',
                payload: id,
            }
        );
    };

    const resetCart = () => {
        dispatch({
            type: 'ResetCart',
        });
    };

    return {
        productos,
        cartItems,
        categorias,
        resetCart,
        buscarProductosPorCategoria,
        buscarProductos,
        handlerDecrementProductCart,
        handlerAddProductCart,
        handlerDeleteItem,
    }
}