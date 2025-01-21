import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Register from '../Registro/Register'; // Ajusta la ruta según la ubicación de tu componente Register
import Login from '../Registro/Login'; // Ajusta la ruta según la ubicación de tu componente Login

function Navbar() {
  // Estados para controlar la visibilidad de los componentes de registro e inicio de sesión
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className='barra'>
      <div className='navbar'>
        <ul className='items'>
          <Link className='links' to="/">Home</Link>

          <NavDropdown className='linksdrop' title="Cursos" id="nav-dropdown">
            <NavDropdown.Item className='linksdrop2' as={Link} to="/cursos">Cursos</NavDropdown.Item>
          </NavDropdown>

          <Link className='links' to="/admin">Administración</Link>

          {/* Agregar enlaces o botones para abrir los componentes de registro e inicio de sesión */}
          <li><button onClick={() => setShowRegister(true)}>Registro</button></li>
          <li><button onClick={() => setShowLogin(true)}>Iniciar Sesión</button></li>
        </ul>
      </div>

      {/* Mostrar el componente de registro si showRegister es true */}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}

      {/* Mostrar el componente de inicio de sesión si showLogin es true */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default Navbar;