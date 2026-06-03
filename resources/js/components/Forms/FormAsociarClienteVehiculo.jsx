import { AsociarClienteVehiculoProvider } from "../../context/AsociarClienteVehiculoContext";
import HolderVehiculoCliente from "../Holder/HolderVehiculoCliente";

const FormAsociarClienteVehiculo = () =>{
    return(
    <AsociarClienteVehiculoProvider>
        <HolderVehiculoCliente/>
    </AsociarClienteVehiculoProvider>)
}

export default FormAsociarClienteVehiculo;