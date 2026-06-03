import { Table } from "react-bootstrap"
import { MdDelete } from "react-icons/md";
const ListProductos = ({productos, isErase, inErase, colorTable="dark",titulo="PRODUCTOS"}) =>{
    const eliminarProducto = (data) =>{
        inErase(data)
    }
    return (
        <Table className="w-100" variant={colorTable}>
            <thead>
            <tr>
                <th colSpan={4}>{titulo}</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Nombre Prodcuto</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((productos, index) => (
              <tr key={productos.id}>
                <td>{index + 1}</td>
                <td>{productos.nombreproducto}</td>
                <td>{productos.costo} Bs.</td>
                <td>
                    {isErase ? (
                        <button
                        className="btn btn-danger ml-2"
                        onClick={() => eliminarProducto(productos)}
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
 export default ListProductos;