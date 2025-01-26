import React from 'react';
import CarouselComponent from './CarouselComponent ';
import { Link } from 'react-router-dom';


const QuienesSomos = () => {
  return (
    <>
      <section1>
        <div className="containerBio">
          <h2>Nuestro actuar está determinado<br></br> por nuestros valores</h2>
          <ul>
            <li><strong>Calidad y Sostenibilidad:</strong> Cada pieza de Cururu es fabricada con materiales de alta calidad y procesos sostenibles. Valoramos el uso de recursos renovables y la producción responsable para cuidar del medio ambiente y ofrecer productos duraderos.</li>
            <li><strong>Amor y Dedicación:</strong> Ponemos el corazón en cada uno de nuestros productos. Creemos en la importancia del cuidado y la dedicación en la creación de materiales que acompañen el crecimiento de los niños.</li>
            <li><strong>Fomento de la Creatividad:</strong> Nos esforzamos por crear juguetes y muebles que estimulen la imaginación y la creatividad de los niños, permitiéndoles expresarse libremente y desarrollar sus habilidades únicas.</li>
          </ul>
          <div className='containerButtonQS'>
            <Link to="/Nosotros"><button className='bton'>Conoce más</button></Link>
          </div>
        </div>
        <div className='contenedorCarousel'>
          <CarouselComponent />
        </div>


      </section1>
    </>
  );
}

export default QuienesSomos;
