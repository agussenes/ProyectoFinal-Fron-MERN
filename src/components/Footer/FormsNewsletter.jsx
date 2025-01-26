import React, {useState} from 'react';

const FormsNewsletter = ({agregarSuscriptor}) => {
    const [correo, setCorreo] = useState('');

    const manejarEnvio = (e) => { // Función para atrapar el correo
        e.preventDefault(); // Garantiza que no venga vacio
        if (correo){
            agregarSuscriptor(correo);
            setCorreo(''); // Limpiar el campo una vez agregado
        }
        
    }

    return(
        
        <form onSubmit={manejarEnvio}>

            <input className="newsMail"
            type="email"
            placeholder=" Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo (e.target.value)}
            />
            <button className="newsButton" type="submit">Suscribirse</button>

        </form>
    )

}

export default FormsNewsletter;