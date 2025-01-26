import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";
import "./Navbar.css";

const Navbar = ({ onBuscar, carrito }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const { user, logout } = useContext(UserContext); // Contexto

  const handleSearchChange = (e) => {
    setTerminoBusqueda(e.target.value);
    onBuscar(e.target.value);
  };

  const totalProductos = carrito.reduce((total, producto) => total + (producto.cantidad || 0), 0);

  return (
    <div className="containerNavbar">
      <div className="brand">
        <Link to="/">
          <img src="img/marca/LogoConNombreeee.png" alt="Cururu" />
        </Link>
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Buscar productos"
          value={terminoBusqueda}
          onChange={handleSearchChange}
        />
      </div>
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
          {/* Mostrar enlace al panel de administración si el usuario es Admin */}
          {user?.rol === "Admin" && (
            <li className="d-flex align-items-center">
              <Link to="/admin" className="d-flex align-items-center">
                <small className="me-1">Panel</small>
                <FontAwesomeIcon icon={faGear} />
              </Link>
            </li>

          )}
        </ul>
        <div className="navButtons">
          {user ? (
            <>
              <span className="text-light fw-bold">Hola, {user.username}!</span>
              <button onClick={logout} className="navButton">Logout <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: "5px" }} />
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
