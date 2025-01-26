import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Acceder al contexto

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/auth/login", loginData);
      console.log("Respuesta del backend:", response.data); // Log de depuración
      const { user, token } = response.data;
  
      login(user, token); // Actualiza el contexto
      setSuccessMessage("¡Logeado con éxito! Redirigiendo...");
      setErrorMessage("");
  
      setTimeout(() => {
        navigate("/"); // Redirigir al home
      }, 2000);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error); // Log de depuración
      setErrorMessage(error.response?.data?.error || "Error al iniciar sesión.");
      setSuccessMessage("");
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="login-input-container">
            <input
              id="username"
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="username">Usuario</label>
          </div>
          <div className="login-input-container">
            <input
              id="password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
