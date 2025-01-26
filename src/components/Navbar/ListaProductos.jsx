import React from 'react';

const ListaProductos = ({ productos }) => {
  if (productos.length === 0) {
    return null
    ;
  }

  return (
    <div className="listaProductosContainer">
      <div className="listaProductos">
      {productos.slice(0, 7).map((producto) => (
      
        <div key={producto.id} className="productosLista">
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
      </div>
    
      ))}
    </div>
    </div>
  );
};

export default ListaProductos;