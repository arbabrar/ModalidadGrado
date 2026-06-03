import { Button, Card, Col, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
const CardPersonal = ({ personal, toErase, isErase = false }) => {
  const sendDelete = () => {
    if (typeof toErase === "function") {
      toErase(personal);
    } else {
      console.error("toErase is not a function");
    }
  };
  return (
    <Card border="light" bg="dark" key="dark" className="mb-2">
      <Card.Body>
        <Card.Title className="text-white">DATOS DEL TECNICO</Card.Title>
        {isErase && (
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
            {personal.nombre} {personal.apellido}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default CardPersonal;
