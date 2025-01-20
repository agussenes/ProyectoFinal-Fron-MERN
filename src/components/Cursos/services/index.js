import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getCursos(){
    try{
        const response = await axios({
            url: `${baseUrl}/cursos`,
            method: "GET",
        })
        return response
    }
    catch (e) {
        console.log(e)
    }
}

