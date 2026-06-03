import { Table } from "react-bootstrap";

const ListDeudas = ({ deuda, totalDeuda }) => {
  return (
    <Table className="text-table">
      <thead>
        <tr>
          <td colSpan={5} className="text-center">
            {" "}
            COBRO DE DEUDAS
          </td>
        </tr>
        <tr>
          <th>#</th>
          <th>Nombre Personal</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {deuda.length > 0 &&
          deuda.map((deuda, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{deuda.personal}</td>
              <td>{deuda.total} Bs.</td>
            </tr>
          ))}
        <tr>
          <td colSpan={2}>
            <strong>Total</strong>
          </td>
          <td>
            <strong>{totalDeuda.toFixed(2)} Bs.</strong>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListDeudas;
