import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8081/auth/register', userData);
      console.log(response.data);
    } catch (error) {
      console.error('Error al registrar usuario:', error.response?.data?.error || 'Error desconocido');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" name="username" value={userData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
