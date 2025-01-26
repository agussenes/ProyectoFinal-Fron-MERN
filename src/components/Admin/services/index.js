import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;


export async function getProductos() {
    try {
        const response = await axios({
            method: 'GET',
            url: `${baseUrl}/productos`
        })
        return response;

    }
    catch (e) {
        console.log(e);
    }
}

export async function saveProductos(productosData) {
    const formData = new FormData();
    formData.append('nombre', productosData.nombre);
    formData.append('precio', productosData.precio);
    formData.append('categoria', productosData.categoria);
    formData.append('descripcion', productosData.descripcion);
    formData.append('imagen', productosData.imagen);

    try {
        const response = await axios.post(`${baseUrl}/productos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Esto es necesario para manejar archivos
            },
        });
        return response;
    } catch (e) {
        console.error('Error al guardar producto:', e);
        throw e; // Lanza el error para manejarlo en el frontend si es necesario
    }
}


export async function updateProductos(_id, formData) {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_BASE_URL}/productos/${_id}`,
            method: "PUT",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data", // Es necesario para manejar archivos
            },
        });
        return response;
    } catch (e) {
        console.error("Error al actualizar el producto:", e);
        throw e;
    }
}




export async function deleteProductos(_id, datosNuevo) {

    try {
        const response = await axios({
            method: 'DELETE',
            url: `${baseUrl}/productos/${_id}`
        })
        return response
    }
    catch (e) {
        console.log(e);
    }

}