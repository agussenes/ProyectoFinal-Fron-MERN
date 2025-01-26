import React, { useState } from 'react';


function FormularioCrearProducto() {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    codigo: '',
    imgProducto: '',
    precioProducto: '',
    descripcionProducto: '',
  });

  const handleInputChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setProducto({
          ...producto,
          imgProducto: e.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductos([...productos, producto]);
    setProducto({
      nombre: '',
      codigo: '',
      imgProducto: '',
      precioProducto: '',
      descripcionProducto: '',
    });
  };

  const handleEliminarProducto = () => {
    setProductos([]);
  };

  const toggleCompletada = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].completada = !nuevosProductos[index].completada;
    setProductos(nuevosProductos);
  };

  return (
    <div className='containerFormulario'>
      <h2>Crear Nuevo Producto</h2>
      <form id="agregarProducto" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del Producto</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="codigo">Código del Producto</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          placeholder="AAA000"
          value={producto.codigo}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="imgProducto">Imagen del producto</label>
        <input className='selectordeArchivos'
          type="file"
          id="imgProducto"
          name="imgProducto"
          onChange={handleImageChange}
        />
        <br />
        <br />

        <label htmlFor="precioProducto">Precio</label>
        <input
          type="text"
          id="precioProducto"
          name="precioProducto"
          placeholder="$ 000.000"
          value={producto.precioProducto}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="descripcionProducto">Descripción</label>
        <input
          type="text"
          id="descripcionProducto"
          name="descripcionProducto"
          placeholder="Descripción del producto"
          value={producto.descripcionProducto}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <button type="submit">Previsualizar</button>
      </form>

      <h2>Lista de Productos</h2>
      <ul id="productosAgregados">
        {productos.map((prod, index) => (
          <li
            key={index}
            className={prod.completada ? 'completada' : ''}
            onClick={() => toggleCompletada(index)}
            style={{
              textDecoration: prod.completada ? 'line-through' : 'none',
            }}
          >
            <img
              src={prod.imgProducto}
              alt={`Imagen de ${prod.nombre}`}
              width="100"
            />
            <hr />
            <h2>{prod.nombre}</h2>
            <p>({prod.codigo})</p>
            <p>${prod.precioProducto}</p>
            <p>{prod.descripcionProducto}</p>
          </li>
        ))}
      </ul>

      <div className="containerButtons">
        <button id="eliminarProducto" onClick={handleEliminarProducto}>
          Eliminar Producto
        </button>
      </div>
    </div>
  );
}

export default FormularioCrearProducto;
