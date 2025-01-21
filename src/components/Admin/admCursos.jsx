import React, {useState, useEffect} from 'react';

import {getCursos} from './services';

import CrearCursos from './cruds/cursos/crearCursos';
import ActCursos from './cruds/cursos/actCursos';
import BorrarCursos from './cruds/cursos/borrarCursos';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';



export const AdmCursos = () =>{
    const [cursos, setCursos] = useState([]);

    useEffect(() =>{
        async function cargaCursos() {
            const response = await getCursos();

            if (response.status === 200) {
                setCursos(response.data.cursos)
            }
        }
        cargaCursos()
    }, [])

    return(
        <><Container>
            <CrearCursos/>
            <ActCursos/>
            <BorrarCursos/>
        </Container>

        <Container>

            {cursos.map(({_id, idioma, dia, horario, imagen, modalidad}) =>(

                 <ListGroup key={_id}>
                    <ListGroup.Item>
                        <div>
                            <div>Idioma</div>
                            <h3> {idioma} </h3>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div>
                            <div>Bandera</div>
                            <Image src={process.env.PUBLIC_URL + imagen} alt=""  style={{ maxWidth: '50px', maxHeight: '50px' }} />
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div>
                            <div>Dias de cursada</div>
                            <h3> {dia} </h3>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div>
                            <div>Horario</div>
                            <h3> {horario} </h3>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div>
                            <div>Modalidad de cursada</div>
                            <h3> {modalidad} </h3>
                        </div>
                    </ListGroup.Item>

                 </ListGroup>
            ))}

        </Container>
        </>
    )
}

export default AdmCursos;
