import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
const ListGasto = ({gasto, ongastoSelected}) => {
    const editarGasto =(id) => {
        ongastoSelected(id)
    }
    return(
        <Table variant="dark">
            <thead>
            <tr>
                <th colSpan={6}>Lista de Gastos</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Nombre Personal</th>
              <th>Fecha</th>
              <th>Detalle</th>
              <th>Metodo de Pago</th>
              <th>Monto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gasto.map((gasto, index)=>(
                <tr key={gasto.id}>
                 <td>{index + 1}</td>    
                <td>{gasto.personal}</td>
                <td>{gasto.fecha}</td>
                <td>{gasto.detalle}</td>
                <td>{gasto.metodo_pago}</td>
                <td>{gasto.monto} Bs.</td>
                <td>
                <button
                          className="btn btn-primary"
                          onClick={() => editarGasto(gasto)}
                        >
                          <FaEdit />
                        </button>{" "}
                </td>
                </tr>
            ))}
          </tbody>
        </Table>
    )
}
export default ListGasto;