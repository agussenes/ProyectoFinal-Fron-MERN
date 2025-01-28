import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { UserContext } from '../../contexts/UserContext';
import './Carrito.css';

const Carrito = () => {
  const { carrito, removerDelCarrito } = useContext(UserContext);

  const navigate = useNavigate(); // Inicializar o hook

  const handleFinalizarCompra = () => {
    navigate('/login'); // Redirecionar para a página de login
  };

  return (
    <div className="carritoContainer">
      <h2 className="carritoTitle">Meu Carrinho</h2>

      {carrito.length === 0 ? (
        <div className="noProductos">Não há produtos no seu carrinho.</div>
      ) : (
        <div className="carritoItems">
          {carrito.map((producto) => (
            <div key={producto.uniqueId} className="carritoCard">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>Preço: ${producto.precio}</p>
              <button
                className="carritoButton"
                onClick={() => removerDelCarrito(producto.uniqueId)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      {carrito.length > 0 && (
        <>
           <button
            className="finalizarCompraButton"
            onClick={handleFinalizarCompra} // Chama a função de redirecionamento
          >
            Finalizar Pedido
          </button>
         
        </>
      )}
    </div>
  );
};

export default Carrito;
