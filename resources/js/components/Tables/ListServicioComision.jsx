import { Table, Button } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
const ListServicioComision = ({servicio, onLeftServicio, titulo, colorTable="dark"}) =>{
    const handleClickbutton = (data) =>{
        onLeftServicio(data)
    }
    return(
        <Table className="w-100" variant={colorTable}>
            <thead>
            <tr>
                <th colSpan={8}>{titulo}</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Placa</th>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Costo</th>
              <th>%</th>
              <th>Comision</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {servicio.map((servicio, index)=>(
                <tr key={servicio.id}>
                    <td>{index + 1}</td>
                    <td>{servicio.placa}</td>
                    <td>{servicio.fecha}</td>
                    <td>{servicio.tipo}</td>
                    <td>{servicio.costo} Bs.</td>
                    <td>{servicio.com_personal} %</td>
                    <td>{servicio.comision}</td>
                    <td>
                        <Button variant="warning" 
                        onClick={()=>handleClickbutton(servicio) } >
                            <ImCancelCircle />
                        </Button>
                    </td>
                </tr>

            ))}
          </tbody>
        </Table>
    )
}
export default ListServicioComision;