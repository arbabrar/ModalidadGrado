import { Table } from "react-bootstrap";

const ListGastoReport = ({gastos , totalGasto}) => {
    //console.log(totalGasto)
  return (
    <Table variant="danger" className="text-table">
      <thead>
        <tr>
          <td colSpan={5} className="text-center">
            {" "}
            DETALLE DE GASTOS
          </td>
        </tr>
        <tr>
          <th>#</th>
          <th>Nombre Personal</th>
          <th>Metodo de Pago</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      {gastos.length > 0 &&
          gastos.map((gastos, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{gastos.personal}</td>
              <td>{gastos.metodo_pago}</td>
              <td>{gastos.total}</td>
            </tr>
          ))}
        <tr>
          <td colSpan={3}>
            <strong>Total</strong>
          </td>
          <td>
            <strong>{totalGasto.toFixed(2)} Bs.</strong>
          </td>
         
         
        </tr>
      </tbody>
    </Table>
  );
};
export default ListGastoReport;
