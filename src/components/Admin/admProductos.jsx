import React, { useState, useEffect } from 'react';

import { getProductos } from './services';

import AgregarProductos from './cruds/productos/crearProductos';
import ActProductos from './cruds/productos/actProductos';
import EliminarProducto from './cruds/productos/borrarProductos';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './admPro.css';

export const AdmProductos = () => {
    const [productos, setProductos] = useState([]);

    // Función para cargar productos
    const cargarProductos = async () => {
        const response = await getProductos();
        if (response.status === 200) {
            setProductos(response.data.productos);
        }
    };

    // Cargar productos al montar
    useEffect(() => {
        cargarProductos();
    }, []);

    // Función para actualizar productos tras cambios
    const handleUpdate = async () => {
        console.log("Actualizando productos...");
        await cargarProductos();
    };

    return (
        <>
            <Container className="my-4">
                <Row className="mb-4 justify-content-center">
                    <Col xs="auto">
                        <AgregarProductos />
                    </Col>
                    <Col xs="auto">
                        <ActProductos onProductUpdate={handleUpdate} />
                    </Col>
                    <Col xs="auto">
                        <EliminarProducto onProductUpdate={handleUpdate} />
                    </Col>
                </Row>

                <Row className="g-4">
                    {productos.map(({ _id, nombre, descripcion, categoria, precio, imagen }) => (
                        <Col key={_id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={imagen}
                                    alt={nombre}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-center">{nombre}</Card.Title>
                                    <Card.Text className="text-muted">{descripcion}</Card.Text>
                                    <Card.Text><strong>Categoría:</strong> {categoria}</Card.Text>
                                    <Card.Text><strong>Precio:</strong> ${precio}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default AdmProductos;
