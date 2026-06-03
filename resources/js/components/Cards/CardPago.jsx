import { Button, Card, Col, Row } from "react-bootstrap";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const CardPago = ({totalServicio=0, totalProducto=0, total=0, cuotaDeuda=0, handleClickDeuda}) =>{
    return(
        <Card border="light" bg="dark" key="dark" className="mb-2">
            <Card.Body>
            <Card.Title className="text-white">DETALLE DE PAGO</Card.Title>
                <Row className="m-3">
                    <Col sm className="text-light">
                        TOTAL SERVICIO: {totalServicio}
                    </Col>
                    <Col className="text-danger">
                        TOTAL PRODUCTO: {totalProducto}
                    </Col>
                    
                </Row>
                <Row className="m-3">
                    {cuotaDeuda > 0 && 
                    <Col sm className="text-info">
                        CUOTA DEUDA: <Button  size="sm" onClick={()=>handleClickDeuda('less')} className="m-2" variant="light"><FaMinus /></Button> 
                        {cuotaDeuda} <Button  size="sm" onClick={()=>handleClickDeuda('add')} className="m-2" variant="primary"><FaPlus /></Button>

                    </Col>
                }
                    <Col className="text-warning">
                        TOTAL CANCELAR: {total}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardPago;