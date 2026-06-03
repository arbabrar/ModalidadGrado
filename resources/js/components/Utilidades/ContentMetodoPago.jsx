import { Table, Card } from "react-bootstrap";

const ContentMetodoPago = ({ totalPorMetodoPago }) => {
  // Verificar si hay datos disponibles
  if (!totalPorMetodoPago || Object.keys(totalPorMetodoPago).length === 0) {
    return <p>No hay totales disponibles por método de pago.</p>;
  }

  return (
    <Card className="mb-4">
      <Card.Header as="h4">Totales por Método de Pago</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Método de Pago</th>
              <th>Total (Bs)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(totalPorMetodoPago).map(([metodo, total], index) => (
              <tr key={index}>
                <td>{metodo}</td>
                <td>{total.toFixed(2)} Bs.</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ContentMetodoPago;
