// React Component for ClienteCard
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
const CardCliente= ({ cliente, toErase, isErase = false}) => {
    const sendDelete = () => {
        if (typeof toErase === "function") {
          toErase(cliente);
        } else {
          console.error("toErase is not a function");
        }
      };

    return (
        <Card border="light" bg="success" key="primary" className="mb-2">
      <Card.Body>
        <Card.Title className="text-white">DATOS DEL CLIENTE</Card.Title>
        {isErase &&
          (
            <Button
              size="sm"
              variant="outline-light"
              className="float-end"
              onClick={sendDelete}
            >
              <FaRegTrashAlt />
            </Button>
          )}

        <Row className="m-3">
          <Col sm className="title-data">
            NOMBRE
          </Col>
          <Col sm className="data">
            {cliente.nombre}
          </Col>
          <Col sm className="title-data">
            NIT
          </Col>
          <Col sm className="data">
            {cliente.nit}
          </Col>
        </Row>
      </Card.Body>
    </Card>
    );
}

export default CardCliente;
