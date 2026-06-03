import { Table } from "react-bootstrap";

const ListProductoServicioReport = ({ productos_servicio , totalCosto=0 }) => {
  // Calcular el costo total
  

  return (
    <Table variant="warning" className="text-table">
      <thead>
        <tr>
          <td colSpan={4} className="text-center">
            {" "}
            DETALLE DE PRODUCTOS VENDIDOS
          </td>
        </tr>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {/* Verificar si productos_servicio no está vacío */}
        {productos_servicio.length > 0 ? (
          productos_servicio.map((producto, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{producto.nombreproducto}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.total_costo}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No hay productos disponibles.
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={3}>
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

export default ListProductoServicioReport;
