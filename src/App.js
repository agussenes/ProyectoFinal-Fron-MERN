import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from './contexts/UserContext'; // Contexto de usuários
import ProtectedRoute from './components/ProtectedRoute'; // Componente para proteger rotas
import NavBar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import BodyMain from "./components/BodyMain";
import Admin from "./components/Admin/admin";
import Login from './components/Registro/Login';
import Register from './components/Registro/Register';
import Productos from './components/Productos/productos';
import Checkout from './components/Checkout/Checkout'; // Novo componente de checkout
import Contacto from './components/Contacto';
import Carrito from './components/Carrito/Carrito';
import Nosotros from "./components/Nosotros";
import './components/Styleh.css'; // Certifique-se de que a rota seja correta

function App() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [productos, setProductos] = useState([]);

  // Carregar produtos de um arquivo ou API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/products.json'); // Ajuste a rota conforme sua fonte de dados
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };
    fetchData();
  }, []);

  // Filtrar produtos por busca
  const productosFiltrados = terminoBusqueda
    ? productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      )
    : productos;

  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar 
          onBuscar={setTerminoBusqueda} 
          productos={productosFiltrados} 
        />
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<BodyMain />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Carrito" element={<Carrito />} />

          {/* Rotas protegidas */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="Admin">
                <Admin />
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

          {/* Rotas de autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
