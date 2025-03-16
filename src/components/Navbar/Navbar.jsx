import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGear, faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, carrito, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalProductos = carrito.reduce(
    (total, producto) => total + (producto.cantidad || 1),
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="containerNavbar">
      {/* Logo */}
      <div className="brand">
        <Link to="/">
          <img src="img/marca/LogoConNombreeee.png" alt="Cururu" />
        </Link>
      </div>

      {/* Ícone do menu hambúrguer */}
      <div className="menuIcon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Navegação */}
      <nav className={`navBar ${menuOpen ? "show" : "hide"}`}>
        <ul className={`navLinks ${menuOpen ? "show" : "hide"}`}>
          <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/productos" onClick={closeMenu}>Catálogo</Link></li>
          <li><Link to="/Contacto" onClick={closeMenu}>Contacto</Link></li>
          <li><Link to="/Nosotros" onClick={closeMenu}>Nosotros</Link></li>
          <li>
            <Link to="/Carrito" onClick={closeMenu}>
              <div className="carritoNavbar">
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="carritoTotalNav">{totalProductos}</span>
              </div>
            </Link>
          </li>
          {user?.rol === "Admin" && (
            <li>
              <Link to="/admin" onClick={closeMenu}>
                <FontAwesomeIcon icon={faGear} /> Panel
              </Link>
            </li>
          )}
          {/* Botões de login/logout */}
          <li className="navButtons">
            {user ? (
              <>
                <span className="text-light fw-bold">Hola, {user.username}!</span>
                <button className="navButton" onClick={handleLogout}>
                  Logout <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navButton" onClick={closeMenu}>Iniciar Sesión</Link>
                <Link to="/register" className="navButton" onClick={closeMenu}>Registro</Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
