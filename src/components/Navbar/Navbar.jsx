// import React, {useState} from 'react';

import { Link } from 'react-router-dom';

import NavDropdown from 'react-bootstrap/NavDropdown';

// import Register from '../Registro/Register';
// import Login from '../Registro/Login';

function Navbar(){


    return(
        <div>
            <ul>
                <Link to="/">Home</Link>

                <NavDropdown>
                    <NavDropdown.Item>Cursos</NavDropdown.Item>
                </NavDropdown>   

            </ul>
        </div>
    )
}

export default Navbar;