import React from 'react';
import './Carrito.css';

const Carrito = ({ carrito, setCarrito }) => {

    const eliminarDelCarrito = (productoId) => {

        setCarrito((prevCarrito) =>
            prevCarrito.filter((producto) => producto.id !== productoId)
        );
    };

    return (
        <div className="carritoContainer">
            <h2 className="carritoTitle">Carrito de Compras</h2>
            {carrito.length > 0 ? (
                <>
                    <div className="carritoItems">
                        {carrito.map((producto) => (
                            <div className="carritoCard" key={producto.id}>
                                <img src={producto.imagen} alt={producto.nombre} />
                                <h3>{producto.nombre}</h3>
                                <p>{producto.descripcion}</p>
                                <p>Precio: ${producto.precio}</p>
                                
                                <button className="carritoButton" onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                    
                    <button className="finalizarCompraButton">Comprar</button>
                </>
            ) : (
                <p className="noProductos">No hay productos en el carrito</p>
            )}
        </div>
    );
};

export default Carrito;

