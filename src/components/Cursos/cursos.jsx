import React, { useState, useEffect } from 'react';
import { getCursos } from './services';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const Cursos = () => {
    const [key, setKey] = useState('idioma');
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargaCursos() {
            try {
                const response = await getCursos();

                if (response && response.status === 200) {
                    setCursos(response.data.cursos || []);
                } else {
                    console.error('Error en la respuesta:', response);
                    setError('No se pudo cargar los cursos. Verifica la API.');
                }
            } catch (err) {
                console.error('Error al cargar cursos:', err);
                setError('Ocurrió un error al intentar cargar los cursos.');
            }
        }
        cargaCursos();
    }, []);

    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    if (!cursos.length) {
        return <div className="text-center mt-5">Cargando contenido...</div>;
    }

    const cursosPorIdioma = cursos.reduce((acc, curso) => {
        if (!acc[curso.idioma]) {
            acc[curso.idioma] = [];
        }
        acc[curso.idioma].push(curso);
        return acc;
    }, {});

    return (
        <Container className="backGround d-flex flex-column mt-5">
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                {Object.entries(cursosPorIdioma).map(([idioma, cursos]) => (
                    <Tab eventKey={idioma} title={idioma} key={idioma}>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            {cursos.map((curso) => (
                                <Card key={curso.id} style={{ width: '18rem' }}>
                                    <Card.Img
                                        variant="top"
                                        src={curso.imagen}
                                        style={{ height: '10rem' }}
                                    />
                                    <Card.Body>
                                        <Card.Title className="m-2">{curso.modalidad}</Card.Title>
                                        <Card.Text>
                                            {curso.dia} - {curso.horario}
                                        </Card.Text>
                                        <Button variant="primary">Inscripción</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">{idioma}</Card.Footer>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default Cursos;

