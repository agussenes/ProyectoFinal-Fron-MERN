import React from 'react';
import atencionCliente from '../../imagenes/atencion-al-cliente.png';
import disenoPersonalizado from '../../imagenes/el-pensamiento-de-diseno.png';
import catalogo from '../../imagenes/productos.png';
import { Link } from 'react-router-dom';

const ContainerAccion = () => {
  return (
    <div className="containerAccion">
      <Link to={"./Contacto"} id='linkAccion'>
        <div className="accion">
          <img src={atencionCliente} alt="icono atencion al cliente" />
          <Link to={"/Contacto"} id='linkAccion'><h3>Atención Personalizada</h3></Link>
        </div></Link>
      <Link to={"./Catalogo"} id='linkAccion'>
        <div className="accion">
          <img src={disenoPersonalizado} alt="diseño personalizado" />
          <Link to={"/"} id='linkAccion'><h3>Diseños Personalizados</h3></Link>
        </div>
      </Link>

      <Link to={"./productos"} id='linkAccion'>
        <div className="accion">
          <img src={catalogo} alt="Catálogo" />
          <Link to={"./productos"} id='linkAccion'><h3>Catálogo</h3></Link>
        </div>
      </Link>
    </div>
  );
}

export default ContainerAccion;
