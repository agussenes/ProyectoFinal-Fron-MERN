import React from 'react';
import { Carousel } from 'react-bootstrap';
import carousel1 from '../../imagenes/carousel.jpg';
import carousel2 from '../../imagenes/encastres.jpg';
import carousel3 from '../../imagenes/rompecabezamaderaia.jpg';
import './CarouselCSS.css';

const CarouselComponent = () => {

  return (
    <div className='tituloItemCarousel'>
      <Carousel fade> {/* El atributo fade agrega el efecto de desvanecimiento */}
        <Carousel.Item interval={2000}> {/* El intervalo de cambio de imágenes */}
          <img
            className="d-block w-100"
            src={carousel1}
            alt="First slide"
          />
          <Carousel.Caption>
            <div className='contenedorCarousel'><h3 className='tituloItemCarousel'>Domino Animales</h3></div>
            
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={carousel2}
            alt="Second slide"
          />
          <Carousel.Caption>
          <div className='contenedorCarousel'> <h3 className='tituloItemCarousel'>Encantres de Madera</h3></div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={carousel3}
            alt="Third slide"
          />
          <Carousel.Caption>
          <div className='contenedorCarousel'><h3 className='tituloItemCarousel'>Rompecabezas de Animales</h3></div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;