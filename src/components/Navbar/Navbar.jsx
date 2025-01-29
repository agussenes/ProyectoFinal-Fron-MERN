import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, carrito, logout } = useContext(UserContext); 
  const navigate = useNavigate();


  const totalProductos = carrito.reduce(
    (total, producto) => total + (producto.cantidad || 1), 
    0
  );

 
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="containerNavbar">
      {/* Logo */}
      <div className="brand">
        <Link to="/">
          <img src="img/marca/LogoConNombreeee.png" alt="Cururu" />
        </Link>
      </div>

      {/* Navegação */}
      <nav className="navBar">
        <ul className="navLinks">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Catálogo</Link></li>
          <li><Link to="/Contacto">Contacto</Link></li>
          <li><Link to="/Nosotros">Nosotros</Link></li>
          <li>
            <Link to="/Carrito">
              <div className="carritoNavbar">
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="carritoTotalNav">{totalProductos}</span>
              </div>
            </Link>
          </li>
          {user?.rol === "Admin" && (
            <li className="d-flex align-items-center">
              <Link to="/admin" className="d-flex align-items-center">
                <small className="me-1">Panel</small>
                <FontAwesomeIcon icon={faGear} />
              </Link>
            </li>
          )}
        </ul>

        {/* Botões de login/logout */}
        <div className="navButtons">
          {user ? (
            <>
              <span className="text-light fw-bold">Hola, {user.username}!</span>
              <button 
                className="navButton" 
                onClick={handleLogout} 
              >
                Logout <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: "5px" }} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navButton">Iniciar Sesión</Link>
              <Link to="/register" className="navButton">Registro</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
