import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../../contexts/UserContext';
import './Carrito.css';

const Carrito = () => {
  const { carrito, removerDelCarrito } = useContext(UserContext);

  const navigate = useNavigate(); 

  const handleFinalizarCompra = () => {
    navigate('/checkout'); 
  };

  return (
    <div className="carritoContainer">
      <h2 className="carritoTitle">Mi Carrito</h2>

      {carrito.length === 0 ? (
        <div className="noProductos">No hay productos en el carrito.</div>
      ) : (
        <div className="carritoItems">
          {carrito.map((producto) => (
            <div key={producto.uniqueId} className="carritoCard">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <button
                className="carritoButton"
                onClick={() => removerDelCarrito(producto.uniqueId)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {carrito.length > 0 && (
        <>
           <button
            className="finalizarCompraButton"
            onClick={handleFinalizarCompra} 
          >
            Finalizar Compra
          </button>
         
        </>
      )}
    </div>
  );
};

export default Carrito;
