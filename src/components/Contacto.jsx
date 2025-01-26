import './Contacto.css';
import Formulario from './reutilizables/Formulario.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


const Contacto = () => {

    return (
        <div className='ContainerGenContacto'>
            <div className='cabecera'>
                <h2>Ponete en contacto con nosotros!</h2>               
            </div>
            <div className='formYubi'>
                <div className='formulario'>
                    <Formulario />
                </div>
                <div className='contenedorredesflex'>
                <div className='ubicacion'>
                    <h3>Seguinos en nuestras redes</h3>
                    <div className='redesSociales'>
                        <div className='facebook'>
                            <Link to="/"><FontAwesomeIcon icon={faFacebook} color="#3b5998" /></Link>

                        </div>
                        <div className='instagram'>
                            <Link to="/"><FontAwesomeIcon icon={faInstagram} color="#E1306C" /></Link>
                        </div>
                        <div className='whatsapp'>
                            <Link to="/"><FontAwesomeIcon icon={faWhatsapp} color="#25D366" /></Link>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Contacto;