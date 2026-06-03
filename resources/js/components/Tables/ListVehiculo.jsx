import { Table, Button } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
const ListVehiculo = ({ vehiculos, titulo, color, toErase }) => {
  const sendDelete = (vehiculo) => {
    if (typeof toErase === "function") {
      toErase(vehiculo);
    } else {
      console.error("toErase is not a function");
    }
  };
  return (
    <Table className="text-table" variant={color}>
      <thead>
        <tr>
          <td colSpan={7} className="text-center">
            {titulo}
          </td>
        </tr>
        <tr>
          <th>#</th>
          <th>Placa</th>
          <th>Marca</th>
          <th>Color</th>
          <th>Clase</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {vehiculos.length > 0 &&
          vehiculos.map((vehiculo, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.color}</td>
              <td>{vehiculo.clase}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => sendDelete(vehiculo)}
                >
                  <FaRegTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ListVehiculo;
