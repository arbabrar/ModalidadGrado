import {
  Card,
  Col,
  Container,
  Nav,
  Row,
  Button,
  Table,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";
import BrigthIcon from "../Icons/BrigthIcon";
import BusIcon from "../Icons/BusIcon";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoHelpBuoy } from "react-icons/io5";
import usePetitionGet from "../../hook/usePetitionGet";
import { useEffect, useState } from "react";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import Loading from "../Utilidades/Loading/Loading";
import { CiEdit } from "react-icons/ci";
import { FaCashRegister } from "react-icons/fa6";
import AlertEmpty from "../Utilidades/AlertEmpty";
const Welcome = () => {
  const navigate = useNavigate();
  const handlerClickNav = (route) => {
    navigate(route);
  };
  const [pendiente, setPendiente] = useState([]);
  const {
    dato: pendienteData,
    cargando: pendienteCargando,
    error,
  } = usePetitionGet({
    ruta: "getlavadoPendiente",
    islogged: true,
  });
  useEffect(() => {
    if (pendienteData) {
      setPendiente(pendienteData);
    }
  }, [pendienteData, pendienteCargando, error]);
  const editarPendiente = (id) => {
    handlerClickNav(`/editarServicio/${id}`);
  };
  const pagarPendiente = (id) => {
    handlerClickNav(`/pagarServicio/${id}`);
  };
  return (
    <Container className="principal-container">
      <Row>
        <Col lg={6} sm={12}>
          <Card bg="danger" text="white" className="mb-2">
            <Card.Body className="align-middle">
              <Card.Title>
                <BrigthIcon /> Servicios
              </Card.Title>
              <Nav className="justify-content-end " activeKey="/home">
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => handlerClickNav("registrarServicio")}
                    >
                      Nuevo
                    </Button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => handlerClickNav("listarServicio")}
                    >
                      Listar
                    </Button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Button variant="outline-light">Credito</Button>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} sm={12}>
          <Card bg="primary" text="white" className="mb-2">
            <Card.Body className="align-middle">
              <Card.Title>
                <IoHelpBuoy />
                Otros
              </Card.Title>

              <Nav className="justify-content-end mb-3">
                <Nav.Item>
                
                <DropdownButton
                    id="dropdown-basic-button"
                    variant="outline-light"
                    title="Reportes"
                  >
                    <Dropdown.Item onClick={()=>handlerClickNav('reports')}>Reporte Diario</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Reporte de Servicios
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Reporte Metodos de Pago
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Reporte Pago Personal
                    </Dropdown.Item>
                    
                  </DropdownButton>
                </Nav.Item>
                <Nav.Item>
                
                <DropdownButton
                    id="dropdown-basic-button"
                    variant="outline-light"
                    title="Clientes"
                  >
                    <Dropdown.Item onClick={()=>handlerClickNav('registroCliente')}>Registro</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handlerClickNav('verCliente/juridico')}>Juridico</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handlerClickNav('verCliente/natural')}>Natural</Dropdown.Item>
                  </DropdownButton>
                </Nav.Item>
                <Nav.Item>
                <DropdownButton
                    id="dropdown-basic-button"
                    variant="outline-light"
                    title="Deudas"
                  >
                    <Dropdown.Item onClick={()=>handlerClickNav('registroDeuda')}>Registro de Deuda</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Listar Deudas
                    </Dropdown.Item>
                    
                    
                    
                  </DropdownButton>  
                </Nav.Item>
                <Nav.Item>
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="outline-light"
                    title="Gastos"
                  >
                    <Dropdown.Item onClick={()=>handlerClickNav('registroGasto')}>Registrar</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handlerClickNav('ListaGasto')}>
                      Listar
                    </Dropdown.Item>
                    
                  </DropdownButton>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={4} sm={12}>
          <Card bg="success" text="white" className="mb-2">
            <Card.Body className="align-middle">
              <Card.Title>
                <UserIcon /> Personal
              </Card.Title>
              <Nav className="justify-content-end ">
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => handlerClickNav("/listaPersonal")}
                    >
                      Listar
                    </Button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => handlerClickNav("/registroPersonal")}
                    >
                      Registrar
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} sm={12}>
          <Card bg="secondary" text="white" className="mb-2">
            <Card.Body className="align-middle">
              <Card.Title>
                <BusIcon /> Vehiculos
              </Card.Title>
              <Nav className="justify-content-end ">
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => handlerClickNav("listaVehiculo")}
                    >
                      Listar
                    </Button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => handlerClickNav("/registroVehiculo")}
                    >
                      Registrar
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} sm={12}>
          <Card bg="info" text="white" className="mb-2">
            <Card.Body className="align-middle">
              <Card.Title>
                <MdOutlineProductionQuantityLimits /> Productos
              </Card.Title>
              <Nav className="justify-content-end ">
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => {
                        handlerClickNav("listaProducto");
                      }}
                    >
                      Listar
                    </Button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Button
                      variant="outline-light"
                      onClick={() => {
                        handlerClickNav("registroProducto");
                      }}
                    >
                      Registrar
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {error && <Errofield mensaje={error.message} />}
        {pendienteCargando && <Loading />}
        {!pendienteCargando && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Tecnico</th>
                <th>Placa</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {pendiente && pendiente.length > 0 ? (
                pendiente.map((pendiente, index) => (
                  <tr key={pendiente.id}>
                    <td>{index + 1}</td>
                    <td>{pendiente.personal}</td>
                    <td>{pendiente.placa}</td>
                    <td>{pendiente.fecha}</td>
                    <td>{pendiente.hora_entrada}</td>
                    <td
                      className={
                        pendiente.id_operacion === 1
                          ? "text-warning"
                          : "text-muted"
                      }
                    >
                      {pendiente.descripcion}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => editarPendiente(pendiente.id)}
                      >
                        <CiEdit />
                      </button>
                      |
                      <button
                        className="btn btn-success ml-2"
                        onClick={() => pagarPendiente(pendiente.id)}
                      >
                        <FaCashRegister />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <AlertEmpty
                  mensaje={"No existen servicios pendientes"}
                  colNum={7}
                  ruta={"registrarServicio"}
                />
              )}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
};
export default Welcome;
