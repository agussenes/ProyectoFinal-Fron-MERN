import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const LlamadaAccionN = () => {
    return (
        <>
            <div className="containerButtom">
                <Link to="/Contacto">
                    <Button variant="success">Contactate!</Button>
                </Link>
            </div>
        </>
    )
};

export default LlamadaAccionN;