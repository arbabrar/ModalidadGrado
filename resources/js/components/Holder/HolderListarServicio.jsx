import { Container } from "react-bootstrap";
import FormListarServicios from "../Forms/FormListarServicios";

const HolderListarServicio = () =>{
    return(
        <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
            <FormListarServicios/>
        </Container>
    )
}
export default HolderListarServicio;