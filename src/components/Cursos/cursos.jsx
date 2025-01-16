import React, { useState, useEffect } from 'react';
import { getCursos } from './services';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const Cursos = () => {

    const [key, setKey] = useState('idioma');
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        async function cargaCursos() {
            const response = await getCursos()

            if (response.status === 200) {
                setCursos(response.data.cursos)
            }
        }
        cargaCursos()
    }, [])

    if (!cursos.length) {
        return <div className='text-center'>Cargando contenido...</div>
    }

    const cursosPorIdioma = cursos.reduce((acc, curso) => {
        if (!acc[curso.idioma]) {
          acc[curso.idioma] = [];
        }
        acc[curso.idioma].push(curso);
        return acc;
      }, {});


    return (
        <Container className='backGround d-flex'>
            {Object.entries(cursosPorIdioma).map(([idioma, cursos]) => (

                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    key={idioma}
                >
                    <Tab eventKey={idioma} title={idioma} className='mb-3'>
                    {cursos.map((curso) => (
                        <Container>
                        <Card >
                        <Card.Img variant="top" src={curso.imagen} style={{height:'10rem'}}/>
                            <Card.Body>
                                <Card.Title className='m-2'>{curso.modalidad}</Card.Title>
                                <Card.Text>
                                    {curso.dia} - {curso.horario}
                                </Card.Text>
                                <Button>Inscripción</Button>
                            </Card.Body>
                            <Card.Footer >{idioma}</Card.Footer>
                        </Card>
                        </Container>
                    ))}
                    </Tab>
                </Tabs>
            ))}
        </Container >
    );
};
export default Cursos