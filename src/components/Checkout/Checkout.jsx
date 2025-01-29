import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext'; // Contexto
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import './Checkout.css';

const Checkout = () => {
  const { carrito, limpiarCarrito } = useContext(UserContext); // Importa limpiarCarrito del contexto
  const navigate = useNavigate();

  // Estado para el modal de transferencia
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleWhatsAppRedirect = () => {
    const numeroWhatsApp = '5493513893394'; // Cambia por tu número de WhatsApp
    const mensaje = encodeURIComponent(
      `¡Hola! Quiero confirmar mi pedido: ${carrito
        .map((item) => `${item.nombre} - $${item.precio} - Id:${item._id}`)
        .join(', ')}.`
    );

    // Abre WhatsApp en una pestaña nueva
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');

    // Cierra el modal
    setShowModal(false);

    // Muestra una alerta elegante con SweetAlert2
    Swal.fire({
      title: '¡Gracias por su compra!',
      text: 'Su pedido ha sido confirmado y procesado.',
      icon: 'success',
      confirmButtonText: 'Volver al inicio',
      confirmButtonColor: '#28a745',
    }).then(() => {
      limpiarCarrito(); // Limpia el carrito después del proceso
      navigate('/'); // Redirige al inicio
    });
  };

  const handleContinueShopping = () => {
    // Redirige a la página de productos
    navigate('/productos');
  };

  // Calcular el monto total
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  if (carrito.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h3>El carrito está vacío. Agrega productos antes de realizar la compra.</h3>
      </Container>
    );
  }

  return (
    <div className='bgColor'>
      <div className="checkout-container">
        <Container>
          <h3 className="text-center my-3 fw-bold">Resumen del Carrito</h3>

          {/* Lista de productos con scroll interno */}
          <div className="checkout-list">
            {carrito.map((producto) => (
              <div className="checkout-item" key={producto.uniqueId}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h4>{producto.nombre}</h4>
                  <p>{producto.descripcion}</p>
                  <p><strong>ID:</strong> {producto._id}</p>
                  <p><strong>Precio:</strong> ${producto.precio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total y botones fijos */}
          <div className="checkout-footer position-fixed bottom-0 end-0 p-3 bg-light">
            <div className="checkout-total ">
              <h4>Total: ${total}</h4>
            </div>
            <div className="checkout-buttons">
              <Button variant="success" onClick={handleModalOpen}>
                Transferencia Bancaria
              </Button>
              <Button variant="primary" onClick={handleContinueShopping}>
                Seguir comprando
              </Button>
            </div>
          </div>

          {/* Modal para transferencia bancaria */}
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Transferencia Bancaria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Datos de la cuenta:</h5>
              <p><strong>CVU:</strong> 1234567890123456789012</p>
              <p><strong>Alias:</strong> tienda.montessori</p>
              <p><strong>Banco:</strong> Banco Ejemplo</p>
              <p>
                Por favor, realiza la transferencia y confirma tu pedido a través de WhatsApp
                haciendo clic en el botón de abajo.
              </p>
              <Form.Group>
                <Button variant="success" onClick={handleWhatsAppRedirect}>
                  Confirmar Pedido por WhatsApp
                </Button>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );

};

export default Checkout;
