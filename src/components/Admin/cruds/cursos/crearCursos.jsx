import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { saveCursos } from '../../services';

function CrearCursos() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [idioma, setIdioma] = useState("");
    const [dia, setDia] = useState("");
    const [horario, setHorario] = useState("");
    const [modalidad, setModalidad] = useState("");

    const inputFileRef = useRef();

    const handleSubmit = (cursosData) => {
        saveCursos(cursosData = {
            idioma: idioma,
            dia: dia,
            horario: horario,
            modalidad: modalidad,
            imagen: inputFileRef.current.files[0],
        })
            .then((response) => {
                handleClose()
                window.location.reload()

            });
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Button className=' shadow m-3' variant="success" type="submit" value="Enviar" onClick={handleShow}>Crear curso</Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear un curso</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="idioma">
                                <Form.Label>Idioma</Form.Label>
                                <Form.Control placeholder="Nombre del idioma" name='idioma' onChange={(event) => { setIdioma(event.target.value) }} />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="imagen" className="mb-3">
                            <Form.Label>Seleccionar imagen</Form.Label>
                            <Form.Control type="file" ref={inputFileRef} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="dia">
                                <Form.Label>Días de cursada</Form.Label>
                                <Form.Control placeholder="Días de cursada" name='dia' onChange={(event) => { setDia(event.target.value) }} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="horario">
                            <Form.Label>Horario de cursada</Form.Label>
                            <Form.Control placeholder="Horario de cursada" name='horario' onChange={(event) => { setHorario(event.target.value) }} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="modalidad">
                                <Form.Select className='mb-3' name='modalidad' onChange={(event) => { setModalidad(event.target.value) }}>
                                    <option>Seleccioná una modalidad</option>
                                    <option value="extensivo">Extensivo</option>
                                    <option value="intensivo">Intensivo</option>
                                    <option value="Híbrido">Híbrido</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" type="submit" onClick={handleSubmit}>Agregar curso</Button>
                    <Button variant="danger" onClick={handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CrearCursos;