import axios from "axios"

export const findAll = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/producto');
        return response.data;    
    } catch (error) {
       console.log(error); 
    }
    return null;
}
export const calculateTotal = (items) =>{
    return items.reduce((accumulator, item) => accumulator + item.precio * item.cantidad, 0);
 }

 export const findAllCategoria = async () => {
    try {
        const response = await axios.get('http://localhost:9010/api/categoria');
        return response.data;    
    } catch (error) {
       console.log(error); 
    }
    return null;
}

export const findProductosByCategoriaId = async (categoriaId) => {
    try {
        const response = await axios.get(`http://localhost:9010/api/producto/categoria/${categoriaId}`);
        return response.data;    
    } catch (error) {
        console.log(error); 
    }
    return null;
}