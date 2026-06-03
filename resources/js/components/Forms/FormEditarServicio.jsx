import { EditarServicioProvider } from "../../context/EditarServicioContext";
import HolderEditarServicio from "../../components/Holder/HolderEditarServicio.jsx";



const FormEditarServicio = () =>{
     
    return(
        <EditarServicioProvider>
            <HolderEditarServicio/>
        </EditarServicioProvider>
    )
}
export default FormEditarServicio;