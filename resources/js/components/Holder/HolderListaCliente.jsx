import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import usePetitionGet from "../../hook/usePetitionGet";
import { useEffect, useState } from "react";
import ListCliente from "../Tables/ListCliente";

const HolderListaCliente = () =>{
    const params = useParams();
    const [cliente, setCliente] = useState([]);
    const { dato: clienteData, cargando: clienteCargando, error: errorGet } = usePetitionGet({
        ruta: `obtenerClientes/${params.clase}`,
        islogged: true,
      });
    useEffect(() => {
        if (clienteData) {
          setCliente(clienteData);
          console.log(clienteData)
        }
      }, [clienteData]);
    return(
       
        <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
           <ListCliente clientes={cliente} titulo={params.clase} />
        </Container>
    )
}
export default HolderListaCliente;