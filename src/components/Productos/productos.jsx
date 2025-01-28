import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getProductos } from "./services";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";  // Importando o Link para navegação
import "./Productos.css";

export const Productos = () => {
  const { agregarAlCarrito } = useContext(UserContext);

  const [key, setKey] = useState("todos");
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await getProductos();
        if (response && response.status === 200) {
          setProductos(response.data.productos || []);
        } else {
          setError("No se pudieron cargar los productos. Verifica la API.");
        }
      } catch (err) {
        setError("Ocurrió un error al intentar cargar los productos.");
      }
    };
    cargarProductos();
  }, []);

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (!productos.length) {
    return <div className="text-center mt-5">Cargando productos...</div>;
  }

  const productosPorCategoria = productos.reduce((acc, producto) => {
    if (!acc[producto.categoria]) {
      acc[producto.categoria] = [];
    }
    acc[producto.categoria].push(producto);
    return acc;
  }, {});

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <div className="contenedorGeneralProductos">
      <Container className="backGround d-flex flex-column">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="bodyEtiqueta mb-3"
        >
          <Tab eventKey="todos" title="Todos" className="bodyEtiqueta">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              {productos.map((producto) => (
                <Card key={producto.id} style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={producto.imagen} />
                  <Card.Body>
                    <Card.Title className="m-2">{producto.nombre}</Card.Title>
                    <Card.Text>{producto.descripcion}</Card.Text>
                    <Card.Text>{producto.categoria}</Card.Text>
                    <Card.Text>${producto.precio}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="btnComprar"
                      >
                        <Link to="/login" className="text-light">Comprar</Link>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleAgregarAlCarrito(producto)}
                        className="btnAgregar"
                      >
                        Agregar al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Tab>
          {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
            <Tab eventKey={categoria} title={categoria} key={categoria}>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {productos.map((producto) => (
                  <Card key={producto.id} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={producto.imagen} />
                    <Card.Body>
                      <Card.Title className="m-2">{producto.nombre}</Card.Title>
                      <Card.Text>{producto.descripcion}</Card.Text>
                      <Card.Text>{producto.categoria}</Card.Text>
                      <Card.Text>${producto.precio}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="primary"
                          className="btnComprar"
                        >
                          <Link to="/login" className="text-light">Comprar</Link>
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => handleAgregarAlCarrito(producto)}
                          className="btnAgregar"
                        >
                          Agregar al Carrito
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default Productos;
