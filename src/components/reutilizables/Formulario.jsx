import './formularioCSS.css'
import { useState } from 'react';

const Formulario = () => {
  const [formInfo, setFormInfo] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleCambios = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formInfo);
    
    setEnviado(true);

    setFormInfo({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  };

  return (
    <div className='contenedorGeneralFormulario'>
      {!enviado ? ( 
        <form onSubmit={handleEnviar}>
          <div>
            <label htmlFor="nombre" className='boxNombre'>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formInfo.nombre}
              onChange={handleCambios}
            />
          </div>
          <div>
            <label htmlFor="email" className='marginEmail'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formInfo.email}
              onChange={handleCambios}
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formInfo.telefono}
              onChange={handleCambios}
            />
          </div>
          <div className='boxMensaje'>
            <label htmlFor="mensaje">Mensaje:</label>
            <input
              type="text"
              id="mensaje"
              name="mensaje"
              value={formInfo.mensaje}
              onChange={handleCambios}
            />
          </div>
          <div className='botonEnviar'>
            <button type="submit">Enviar</button>
          </div>
        </form>
      ) : (
        <div className='mensajeEnviado'>
          <h3>¡Gracias por tu mensaje!</h3>
          <p>Nos pondremos en contacto contigo pronto.</p>
        </div>
      )}
    </div>
  );
};

export default Formulario;
