import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
const ListServicios = ({servicio, isErase=false, inErase, title, colorTable="dark"}) =>{
    const eliminarServicio = (data) =>{
        inErase(data)
    }    
    return(
        <Table className="w-100" variant={colorTable}>
          <thead>
            <tr>
                <th colSpan={4}>{title}</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Servicio</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicio.map((servicio, index) => (
              <tr key={servicio.id}>
                <td>{index + 1}</td>
                <td>{servicio.tipo}</td>
                <td>{servicio.costo} Bs.</td>
                <td>
                    {isErase ? (
                        <button
                        className="btn btn-danger ml-2"
                        onClick={() => eliminarServicio(servicio)}
                      >
                        <MdDelete />
                      </button>
                    ) :(
                        <h6>----</h6>
                    )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    )
}

export default ListServicios;