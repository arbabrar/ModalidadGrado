import { Table } from "react-bootstrap";

const ListProductoPersonalReport = ({ producto_personal, totalCosto }) => {
 
  return (
    <Table variant="primary" className="text-table">
      <thead>
      <tr>
          <td colSpan={5} className="text-center">
            {" "}
            DETALLE DE PRODUCTOS VENDIDOS AL PERSONAL
          </td>
        </tr>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {producto_personal.length > 0 &&
          producto_personal.map((producto_personal, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{producto_personal.nombreproducto}</td>
              <td>{producto_personal.cantidad}</td>
              <td>{producto_personal.total_costo}</td>
              <td>{producto_personal.estado}</td>
            </tr>
          ))}
        <tr>
          <td colSpan={4}>
            <strong>Total</strong>
          </td>
          <td>
            <strong>{totalCosto.toFixed(2)} Bs.</strong>
          </td>
         
         
        </tr>
      </tbody>
    </Table>
  );
};
export default ListProductoPersonalReport;
