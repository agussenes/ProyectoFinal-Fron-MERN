import { useState, useRef, useEffect } from 'react';
import { getProductos, updateProductos } from '../../services';
import { Button, Modal, Form } from 'react-bootstrap';

const ActProductos = ({ onProductUpdate }) => {
    const [show, setShow] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productoSel, setProductoSel] = useState('');
    const [datosProducto, setDatosProducto] = useState({
        nombre: '',
        descripcion: '',
        categoria: '',
        precio: '', // Precio añadido aquí
        imagen: '',
    });

    const inputFileRef = useRef(null);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSelProducto = (event) => {
        const productoId = event.target.value;
        setProductoSel(productoId);

        const productoSeleccionado = productos.find((producto) => producto._id === productoId);
        if (productoSeleccionado) {
            setDatosProducto({
                nombre: productoSeleccionado.nombre,
                descripcion: productoSeleccionado.descripcion,
                categoria: productoSeleccionado.categoria,
                precio: productoSeleccionado.precio, // Precio cargado desde el backend
                imagen: `${productoSeleccionado.imagen}?t=${Date.now()}`, // Añadir timestamp para evitar caché
            });
        }
    };

    const handleSubmit = async () => {
        const confirmar = window.confirm('¿Estás seguro de que querés actualizar este producto?');
        if (confirmar) {
            const formData = new FormData();
            formData.append('nombre', datosProducto.nombre);
            formData.append('descripcion', datosProducto.descripcion);
            formData.append('categoria', datosProducto.categoria);
            formData.append('precio', datosProducto.precio); // Precio añadido al FormData

            // Añadir imagen si hay un archivo seleccionado
            if (inputFileRef.current?.files[0]) {
                formData.append('imagen', inputFileRef.current.files[0]);
            }

            try {
                const response = await updateProductos(productoSel, formData);

                // Depuración: Verifica el objeto recibido
                console.log('Respuesta del backend:', response.data);

                // Actualizar la imagen actual del producto
                if (response.data.producto.imagen) {
                    setDatosProducto((prev) => ({
                        ...prev,
                        imagen: `${response.data.producto.imagen}?t=${Date.now()}`, // Añadir timestamp para la nueva imagen
                    }));
                }

                // Notifica al componente padre
                onProductUpdate(); // Llama a la función pasada como prop para actualizar la lista

                alert('Producto actualizado exitosamente');
                setShow(false); // Cierra el modal
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
            }
        }
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        async function cargaProductos() {
            const response = await getProductos();
            if (response.status === 200) {
                setProductos(response.data.productos);
            }
        }
        cargaProductos();
    }, []);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Actualizar Producto
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="producto">
                            <Form.Label>Seleccionar Producto</Form.Label>
                            <Form.Select value={productoSel} onChange={handleSelProducto}>
                                <option>Seleccionar Producto</option>
                                {productos.map((producto) => (
                                    <option key={producto._id} value={producto._id}>
                                        {producto.nombre} - {producto._id}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {productoSel && (
                            <div>
                                <Form.Group controlId="nombre">
                                    <Form.Label>Nombre del Producto</Form.Label>
                                    <Form.Control
                                        value={datosProducto.nombre}
                                        onChange={(event) =>
                                            setDatosProducto({ ...datosProducto, nombre: event.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="descripcion">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        value={datosProducto.descripcion}
                                        onChange={(event) =>
                                            setDatosProducto({ ...datosProducto, descripcion: event.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="categoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Control
                                        value={datosProducto.categoria}
                                        onChange={(event) =>
                                            setDatosProducto({ ...datosProducto, categoria: event.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="precio">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={datosProducto.precio}
                                        onChange={(event) =>
                                            setDatosProducto({ ...datosProducto, precio: event.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="imagen">
                                    <Form.Label>Imagen Actual</Form.Label>
                                    {datosProducto.imagen && (
                                        <img
                                            src={datosProducto.imagen}
                                            alt="Imagen actual"
                                            style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
                                        />
                                    )}
                                    <Form.Label>Seleccionar Nueva Imagen</Form.Label>
                                    <Form.Control type="file" name="imagen" ref={inputFileRef} />
                                </Form.Group>
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSubmit}>
                        Actualizar producto
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ActProductos;
