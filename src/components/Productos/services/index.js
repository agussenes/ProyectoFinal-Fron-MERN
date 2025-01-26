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
    catch(e){
        console.log(e);
    }
}