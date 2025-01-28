// src/components/Checkout/Checkout.jsx
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext'; // Importa o contexto
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Checkout = () => {
  const { carrito } = useContext(UserContext); // Obtém o carrinho do contexto
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Verifique se o usuário está logado (se houver um token, por exemplo)
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      navigate('/login'); // Redireciona para o login se o usuário não estiver logado
    } else {
      // Processo de compra
      alert('Compra realizada com sucesso!');
    }
  };

  if (carrito.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h3>O carrinho está vazio. Adicione produtos antes de realizar a compra.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3>Resumo do Carrinho:</h3>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {carrito.map((producto) => (
          <div key={producto.id}>
            <h4>{producto.nombre}</h4>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
          </div>
        ))}
      </div>
      <Button variant="primary" onClick={handleCheckout}>Finalizar Compra</Button>
    </Container>
  );
};

export default Checkout;
