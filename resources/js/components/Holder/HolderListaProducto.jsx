import { Container } from "react-bootstrap";
import FormListaProducto from "../Forms/FormListaProducto";

const HolderListaProducto = () =>{
    return(
        <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
            <FormListaProducto/>
        </Container>
    )
}

export default HolderListaProducto;