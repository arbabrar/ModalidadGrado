import { Table, Button } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";

const ListProductosPersonal = ({
  productos,
  onclickProducto,
  titulo,
  colorTable = "primary",
}) => {
  const handleClickbutton = (data) => {
    onclickProducto(data);
  };

  return (
    <Table className="w-100" variant={colorTable} >
      <thead>
        <tr>
          <th colSpan={8}>{titulo}</th>
        </tr>
        <tr>
          <th>#</th>
          <th>Descripcion</th>
          <th>Fecha</th>
          <th>Costo</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto, index) => (
          <tr key={producto.id}>
            <td>{index + 1}</td>
            <td>{producto.nombreproducto}</td>
            <td>{producto.fecha || "Sin fecha"}</td>
            <td>{producto.costo} Bs.</td>
            <td>
              <Button variant="warning" onClick={() => handleClickbutton(producto)}>
                <ImCancelCircle />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListProductosPersonal;
