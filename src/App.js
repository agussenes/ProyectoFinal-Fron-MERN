// src/App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from './contexts/UserContext'; // Contexto de usuarios
import ProtectedRoute from './components/ProtectedRoute'; // Componente para proteger rutas
import NavBar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import BodyMain from "./components/BodyMain";
import Admin from "./components/Admin/admin";
import Login from './components/Registro/Login';
import Register from './components/Registro/Register';
import Productos from './components/Productos/productos';
import Checkout from './components/Checkout/Checkout'; // Nuevo componente de checkout
import Contacto from './components/Contacto';
import Carrito from './components/Carrito/Carrito';
import Nosotros from "./components/Nosotros";
import './components/Styleh.css'; // Asegúrate de que la ruta sea correcta


function App() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Cargar productos desde un archivo o API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/products.json'); // Cambia esta ruta según tu fuente de datos
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    fetchData();
  }, []);

  // Filtrar productos por búsqueda
  const productosFiltrados = terminoBusqueda
    ? productos.filter((producto) =>
        producto.nombre.toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
      )
    : productos;

  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar 
          onBuscar={setTerminoBusqueda} 
          productos={productosFiltrados} 
          carrito={carrito} 
        />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<BodyMain />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Nosotros" element={<Nosotros />} />

          {/* Rutas protegidas */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="Admin">
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/Carrito" 
            element={
              <ProtectedRoute>
                <Carrito carrito={carrito} setCarrito={setCarrito} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
