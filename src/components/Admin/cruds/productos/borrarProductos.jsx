import React, { useState, useEffect } from 'react';

import { getProductos, deleteProductos } from '../../services';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EliminarProducto() {
    const [productos, setProductos] = useState([]);
    const [productoSel, setProductoSel] = useState("");

    useEffect(() => {
        async function cargaProductos() {
            const respuesta = await getProductos();
            if (respuesta.status === 200) {
                setProductos(respuesta.data.productos);
            }
        }
        cargaProductos()
    }, []);

    const handleSelProducto = (event) => {
        setProductoSel(event.target.value);
        console.log(productoSel);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        const confirmDelete = window.confirm(`¿Estas seguro que querés eliminar el producto?`);

        if (confirmDelete) {
            deleteProductos(productoSel)
                .then((response) => {
                    handleClose()
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })

        }
    };

    return (
        <div>
            <Button className=' shadow m-3' variant="primary" type="submit" value="Enviar" onClick={handleShow}>Borrar producto</Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Borrar producto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="nombre">
                            <Form.Select value={productoSel} onChange={handleSelProducto}>
                                <option>Seleccionar producto</option>
                                {productos.map((producto) => (
                                    <option key={producto._id} value={producto._id}>
                                        {producto.nombre} - {producto.descripcion} - {producto.categoria} - {producto.precio}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" type="submit" onClick={handleDelete}>Borrar curso</Button>
                    <Button variant="danger" onClick={handleClose}>Cancelar</Button>
                </Modal.Footer>

            </Modal>
        </div> 
    )

}

export default EliminarProducto;
