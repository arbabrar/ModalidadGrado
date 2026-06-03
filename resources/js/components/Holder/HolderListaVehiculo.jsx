import { Container } from "react-bootstrap";
import FormListVehiculo from "../Forms/FormListVehiculo";

const HolderListaVehiculo = () =>{
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
            <FormListVehiculo register={false}/>
        </Container>
    )
}
export default HolderListaVehiculo;