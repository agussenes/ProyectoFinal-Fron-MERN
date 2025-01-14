import Carousel from 'react-bootstrap/Carousel';

function Home(){
    return (
        <div>
            <div>

                <h1>Bienvendios a cursos</h1>
                <h4>Aquí aprenderemos sobre distintos cursos</h4>
                <p>Aprender nunca fue tan facil!!</p>

            </div>

            <div>
                <Carousel>
                    <Carousel.Item>
                        <img src="img/carrousel/imagen1.jpg" alt="Imagen1"/>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src="img/carrousel/imagen2.jpg" alt="Imagen2"/>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src="img/carrousel/imagen3.jpg" alt="Imagen3"/>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src="img/carrousel/imagen4.jpg" alt="Imagen4"/>
                    </Carousel.Item>
                </Carousel>
            </div>

        </div>
    )
}

export default Home; 