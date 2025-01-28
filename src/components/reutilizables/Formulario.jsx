import React, { useState } from 'react';
import './formularioCSS.css';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');

    try {
      const response = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensajeExito('¡Gracias por contactarnos! Te responderemos pronto.');
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' }); // Limpar formulário
      } else {
        const errorData = await response.json();
        setMensajeError(errorData.error || 'Hubo un error al enviar el formulario.');
      }
    } catch (err) {
      setMensajeError('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="contenedorGeneralFormulario">
      <form className="formulario-contacto" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu email"
            required
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ingresa tu teléfono"
          />
        </div>
        <div className="boxMensaje">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje"
            required
          ></textarea>
        </div>
        <div className="botonEnviar">
          <button type="submit">Enviar</button>
        </div>
        {mensajeExito && <p className="mensajeExito">{mensajeExito}</p>}
        {mensajeError && <p className="mensajeError">{mensajeError}</p>}
      </form>
    </div>
  );
};

export default Formulario;
