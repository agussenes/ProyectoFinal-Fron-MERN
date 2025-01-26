import { useState, useRef } from "react";

import { saveProductos } from "../../services";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AgregarProductos() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");

    const inputFileRef = useRef();

    const handleSubmit = (productosData) => {
        saveProductos(productosData = {
            nombre: nombre,
            descripcion: descripcion,
            categoria: categoria,
            precio: precio,
            imagen: inputFileRef.current.files[0],
        })
            .then((response) => {
                handleClose()
                window.location.reload()

            });
    }

    return (
        <div>
            <Button variant="primary" type="submit" value="Enviar" onClick={handleShow}>Agregar Producto</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control placeholder="Nombre del Producto" name="nombre" onChange={(event) => { setNombre(event.target.value) }} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="imagen">
                                <Form.Label>Seleccionar imagen:</Form.Label>
                                <Form.Control type="file" name="imagen" ref={inputFileRef} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripcion:</Form.Label>
                                <Form.Control placeholder="Descripcion del Producto" name="descripcion" onChange={(event) => { setDescripcion(event.target.value) }} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="categoria">
                                <Form.Select className='mb-3' name='categoria' onChange={(event) => { setCategoria(event.target.value) }}>
                                    <option>Seleccioná una categoria</option>
                                    <option value="Muebles">Muebles</option>
                                    <option value="Juegos">Juegos</option>
                                    <option value="Personalizado">Personalizado</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="precio">
                                <Form.Label>Precio:</Form.Label>
                                <Form.Control placeholder="Precio del Producto" name="precio" onChange={(event) => { setPrecio(event.target.value) }} />
                            </Form.Group>
                        </Row>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" type="submit" onClick={handleSubmit}>Agregar producto</Button>
                    <Button variant="danger" onClick={handleClose}>Cancelar</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )

}

export default  AgregarProductos;