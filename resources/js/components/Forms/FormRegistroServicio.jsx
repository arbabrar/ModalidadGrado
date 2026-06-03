
import { ServicioProvider } from "../../context/ServicioContext";
import HolderRegistroServicio from "../Holder/HolderRegistroServicio";

const FormRegistroServicio = () =>{
   return(
    <ServicioProvider>
        <HolderRegistroServicio />
    </ServicioProvider>
   )
}

export default FormRegistroServicio;