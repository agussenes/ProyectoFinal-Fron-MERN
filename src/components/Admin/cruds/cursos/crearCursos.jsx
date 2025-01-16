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
    

}