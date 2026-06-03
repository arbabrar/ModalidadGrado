import { Container } from "react-bootstrap";
import FormRegVehiculo from "../Forms/FormRegVehiculo";
import { useNavigate } from "react-router-dom";

const HolderRegistroVehiculo = () =>{
    const navigate = useNavigate();
    const handleDataVehiculo = (vehiculo) =>{
        navigate('/listaVehiculo')
    }
    const cancelar = () =>{
        navigate('/')
    }
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <FormRegVehiculo listenerCancel={cancelar} dataVehiculo={handleDataVehiculo} />
        </Container>
    )
}
export default HolderRegistroVehiculo;