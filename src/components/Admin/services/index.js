import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;


export async function getCursos(){
    try {
        const response = await axios.get({
            method: 'GET',
            url: `${baseUrl}/cursos`
        })
        return response
    }
    catch(e){
        console.log(e)
    }
}

export async function saveCursos(cursosData){
    const formData = new FormData();
    formData.append('idioma', cursosData.idioma);
    formData.append('imagen', cursosData.imagen);
    formData.append('dia', cursosData.dia);
    formData.append('horario', cursosData.horario);
    formData.append('modalidad', cursosData.modalidad);

    try {
        const response = await axios.post({
            method: 'POST',
             url: `${baseUrl}/cursos`,
             data: formData
        })
        return response
} 
catch(e){
    console.log(e)
}
}

export async function updateCursos(_id, datosNuevo){
    try {
        const response = await axios({
             method: 'PUT',
             url: `${baseUrl}/cursos/${_id}`,
             data: datosNuevo
        })
        return response
} 
catch(e){
    console.log(e)
}
}

export async function deleteCursos(_id){
    try {
        const response = await axios({
             method: 'DELETE',
             url: `${baseUrl}/cursos/${_id}`,
        })
        return response
} 
catch(e){
    console.log(e)
}
}