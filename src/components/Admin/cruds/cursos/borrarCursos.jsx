import React, {useState, useEffect} from 'react';

import { getCursos, deleteCursos} from '../../services';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function BorrarCursos(){
    const [cursos, setCursos] = useState([]);
    const [cursoSel, setCursoSel] = useState({});

    useEffect(() =>{
        async function cargaCursos() {
            const response = await getCursos();

            if (response.status === 200) {
                setCursos(response.data.cursos)
            }
        }
        cargaCursos()
    }, [])

    const handleSelCurso = (event) => {
        setCursoSel(event.target.value)
        console.log(cursoSel)
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () =>{
        const  confirmDelete = window.confirm(`¿Estas seguro que querés eliminar el curso?`);

        if(confirmDelete){
            deleteCursos(cursoSel)
        .then((response) => {
            handleClose()
            window.location.reload()
        })
        .catch((error) =>{
            console.log(error)
        })

    }
    };
    
    return(
        <div>
            <Button className=' shadow m-3' variant="primary" type="submit" value="Enviar" onClick={handleShow}>Borrar curso</Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Borrar curso</Modal.Title>
                    </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="idioma">
                                <Form.Select value={cursoSel} onChange={handleSelCurso}>
                                    <option>Seleccionar curso</option>
                                    {cursos.map((curso) =>(
                                        <option key={curso._id} value={curso._id}>
                                            {curso.idioma} - {curso.dia} - {curso.horario} - {curso.modalidad}
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

export default BorrarCursos;
