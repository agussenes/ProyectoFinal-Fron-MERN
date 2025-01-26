import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      console.log(response.data);

      setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
      setErrorMessage('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Manejar errores con detalle
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else if (error.response?.data?.errors) {
        // Si el backend devuelve una lista de errores (ej. validación múltiple)
        const detailedErrors = error.response.data.errors.map((err) => err.msg).join(', ');
        setErrorMessage(`Errores: ${detailedErrors}`);
      } else {
        setErrorMessage('Error desconocido. Por favor, intenta nuevamente.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Registro</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="register-input-container">
            <input
              id="username"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="username">Usuario</label>
          </div>
          <div className="register-input-container">
            <input
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="email">Correo Electrónico</label>
          </div>
          <div className="register-input-container">
            <input
              id="password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <button type="submit" className="register-button">Registrar</button>
        </form>
        <p className="register-login-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
