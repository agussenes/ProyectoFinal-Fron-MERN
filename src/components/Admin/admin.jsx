import React, { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';

import AdmProductos from './admProductos';

import './probiCss.css';


function Admin() {
    const [key, setKey] = useState('productos');

    return (
      <div className='contenedorgeneralAdmin'>
          <Container className='adminMain'>
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey='productos' title={
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'blue', width: '200px' }}>
                        Productos
                    </span>
                }>
                    <AdmProductos />
                </Tab>
            </Tabs>
        </Container>
      </div>

    )
}

export default Admin;