import { Row, Table } from "react-bootstrap";

const ListReportResumen = ({ lavado, totalCosto, totalComision, totalIngreso }) => {
  

  return (
    <Row className="w-100">
      <Table striped bordered hover variant="dark">
        <thead>
            <tr>
              <td colSpan={5} className="text-center"> DETALLE DE SERVICIOS</td>  
            </tr>
          <tr>
            <th>#</th>
            <th>Nombre Personal</th>
            <th>Costo</th>
            <th>Comisión</th>
            <th>Ingreso</th>
          </tr>
        </thead>
        <tbody>
          {lavado.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.personal}</td>
              <td className="text-warning">{item.total_costo} Bs.</td>
              <td className="text-danger">{item.total_comision} Bs.</td>
              <td className="text-info">{item.total_ingreso} Bs.</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <strong>Total</strong>
            </td>
            <td className="text-warning">
              <strong>{totalCosto.toFixed(2)} Bs.</strong>
            </td>
            <td className="text-danger">
              <strong>{totalComision.toFixed(2)} Bs.</strong>
            </td>
            <td className="text-info">
              <strong>{totalIngreso.toFixed(2)} Bs.</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};

export default ListReportResumen;
