import { Container } from "react-bootstrap"
import FormListarPersonal from "../Forms/FormListarPersonal";

const HolderListaPersonal = ()=>{
    return(
        <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
            <FormListarPersonal register={false} />
        </Container>
    )
}
export default HolderListaPersonal;