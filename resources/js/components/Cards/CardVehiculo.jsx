import { Button, Card, Col, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
const CardVehiculo = ({ vehiculo, toErase, isErase = false }) => {
  const sendDelete = () => {
    if (typeof toErase === "function") {
      toErase(vehiculo);
    } else {
      console.error("toErase is not a function");
    }
  };
  return (
    <Card border="light" bg="primary" key="primary" className="mb-2">
      <Card.Body>
        <Card.Title className="text-white">DATOS DEL VEHICULO</Card.Title>
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
            PLACA
          </Col>
          <Col sm className="data">
            {vehiculo.placa}
          </Col>
          <Col sm className="title-data">
            MARCA{" "}
          </Col>
          <Col sm className="data">
            {vehiculo.marca}
          </Col>
          <Col sm className="title-data">
            COLOR
          </Col>
          <Col sm className="data">
            {vehiculo.color}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default CardVehiculo;
