import { Table, Button } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ListCliente = ({clientes, titulo, color='dark'}) =>{
    const navigate = useNavigate();
    return(  <Table className="text-table" variant={color}>
        <thead>
          <tr>
            <td colSpan={6} className="text-center">
              {`LISTA DE CLIENTE ${titulo.toUpperCase()}`}
            </td>
          </tr>
          <tr>
            <th>#</th>
            <th>Nombre / Razon Social</th>
            <th>NIT</th>
            <th>Celular</th>
            <th>Direccion</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 &&
            clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.nit}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => navigate(`/VehiculosCliente/${titulo}/${cliente.id}`)}
                  >
                    <FaCar />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>)
}
export default ListCliente;