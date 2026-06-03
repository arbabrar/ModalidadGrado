import { NavLink } from "react-router-dom";
import "./Inicio.css";
import { Card, Container } from "react-bootstrap";

const Inicio = () =>{
    return (
        <Container className="d-flex justify-content-center card-center text-center">
            <Card style={{ width: '50rem' }} bg="primary" className="text-white">
            <Card.Header>CAR WASH COOFFEE CENTER</Card.Header>
            <Card.Body>
                <Card.Img  src="./imagenes/carwash.png" className="img-logo" />
                
            </Card.Body>
            <Card.Footer>
                <NavLink to="/login" className="btn btn-light">Ingresar</NavLink>
            </Card.Footer>
            </Card>
        </Container>
    )
}
export default Inicio