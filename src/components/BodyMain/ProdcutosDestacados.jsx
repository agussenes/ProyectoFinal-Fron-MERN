import React from 'react';
import producto1 from '../../imagenes/minutasMadera.jpeg';
import producto2 from '../../imagenes/minutasMadera.jpeg';
import producto3 from '../../imagenes/minutasMadera.jpeg';
import producto4 from '../../imagenes/minutasMadera.jpeg';

const ProdcutosDestacados = () => {
  return (
    <div className="containerProductos" id='productosDestacados'>
      <div className="product">
        <img src={producto1} alt="Juegos Montessori" />
        <h2>Juegos Montessori</h2>
        <p>
          • Triángulo grande trepador - Triángulo chico trepador - Cubo trepador. <br /> • Rampa doble cara: lisa y trapadora/escaladora. - Balansín. - Todas las variantes a pedido.
        </p>
        <button>comprar</button>
      </div>
      <div className="product">
        <img src={producto2} alt="Minutas de madera" />
        <h2>Minutas de madera</h2>
        <p>
          • Para fomentar juegos inclusivos y equitativos: alimentos, frutas y utensillos de madera que permiten corte y fraccionamiento de los mismos.
        </p>
        <button>comprar</button>
      </div>
      <div className="product">
        <img src={producto3} alt="Encastres de madera con formas" />
        <h2>Encastres de madera con formas</h2>
        <p>
          • Encantres con motricidad fina, números, matemáticas, ingenio, clasificación en colores y formas. Todo juego es un aprendizaje que inspira a todas las edades en diferentes etapas evolutivas de la niñez.
        </p>
        <button>comprar</button>
      </div>
      <div className="product">
        <img src={producto4} alt="Rompecabezas de madera" />
        <h2>Rompecabezas de madera</h2>
        <p>
          • Juego de dominó grande de piso, con formas de animales. <br /> • Fomentar juegos didácticos que promueven la atención/concentración, la memoria, el pensamiento lógico y la resolución de problemas.
        </p>
        <button>comprar</button>
      </div>
    </div>
  );
};

export default ProdcutosDestacados;
