import { PagoPersonalProvider } from "../../context/PagoPersonalContext";
import HolderPagoPersonal from "../Holder/HolderPagoPersonal";

const FormPagoPersonal = () =>{
    return(
        <PagoPersonalProvider>
            <HolderPagoPersonal/>
        </PagoPersonalProvider>
    )
}
export default FormPagoPersonal;