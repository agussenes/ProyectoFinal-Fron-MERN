import React, { useState, useEffect } from 'react';
import { getProductos } from './services';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './Productos.css';

export const Productos = () => {
    const [key, setKey] = useState('todos'); // Pestaña activa, inicializada en "todos"
    const [productos, setProductos] = useState([]); // Estado inicial como array vacío
    const [error, setError] = useState(null); // Para manejar errores

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const response = await getProductos(); // Llamada a la API
                if (response && response.status === 200) {
                    setProductos(response.data.productos || []); // Establece los productos o un array vacío
                } else {
                    console.error('Error en la respuesta:', response);
                    setError('No se pudieron cargar los productos. Verifica la API.');
                }
            } catch (err) {
                console.error('Error al cargar productos:', err);
                setError('Ocurrió un error al intentar cargar los productos.');
            }
        };
        cargarProductos();
    }, []);

    // Si hay un error, mostrar mensaje
    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    // Si aún no hay productos cargados, mostrar mensaje de carga
    if (!productos.length) {
        return <div className="text-center mt-5">Cargando productos...</div>;
    }

    // Agrupar productos por categoría
    const productosPorCategoria = productos.reduce((acc, producto) => {
        if (!acc[producto.categoria]) {
            acc[producto.categoria] = [];
        }
        acc[producto.categoria].push(producto);
        return acc;
    }, {});

    return (
        <div className="contenedorGeneralProductos">
            <Container className="backGround d-flex flex-column">
                {/* Tabs para mostrar los productos agrupados por categoría */}
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="bodyEtiqueta mb-3"
                >
                    {/* Pestaña "Todos" */}
                    <Tab eventKey="todos" title="Todos" className="bodyEtiqueta">
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            {productos.map((producto) => (
                                <Card key={producto.id} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={producto.imagen} />
                                    <Card.Body>
                                        <Card.Title className="m-2">{producto.nombre}</Card.Title>
                                        <Card.Text>{producto.descripcion}</Card.Text>
                                        <Card.Text>{producto.categoria}</Card.Text>
                                        <Card.Text>${producto.precio}</Card.Text>
                                        <Button variant="primary">Comprar</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab>

                    {/* Pestañas por categoría */}
                    {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
                        <Tab eventKey={categoria} title={categoria} key={categoria}>
                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                {productos.map((producto) => (
                                    <Card key={producto.id} style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={producto.imagen} />
                                        <Card.Body>
                                            <Card.Title className="m-2">{producto.nombre}</Card.Title>
                                            <Card.Text>{producto.descripcion}</Card.Text>
                                            <Card.Text>{producto.categoria}</Card.Text>
                                            <Card.Text>${producto.precio}</Card.Text>
                                            <Button variant="primary">Comprar</Button>
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
