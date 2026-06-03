import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import usePetitionPost from "../../hook/usePetitionPost";
import { useServicioContext } from "../../context/ServicioContext";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import CardVehiculo from "../Cards/CardVehiculo";
import CardPersonal from "../Cards/CardPersonal";
import CardCliente from "../Cards/CardCliente";
import FormListVehiculo from "../Forms/FormListVehiculo";
import FormListarPersonal from "../Forms/FormListarPersonal";
import ListServicios from "../Tables/ListServicios";
import FormListarServicios from "../Forms/FormListarServicios";
import FormRegVehiculo from "../Forms/FormRegVehiculo";
import FormListCliente from "../Forms/FormListCliente";
import FormregistroCliente from "../Forms/FormregistroCliente";

const HolderRegistroServicio = () => {
  const { state, dispatch } = useServicioContext();
  const [formularioActivo, setFormularioActivo] = useState(null); // "vehiculo", "cliente" o null
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost("saveServicio", {}, false);
  const navigate = useNavigate();

  const mostrarFormulario = (tipo) => setFormularioActivo(tipo);
  const cerrarFormulario = () => setFormularioActivo(null);

  const registrarServicio = () => {
    const datos = {
      id_vehiculo: state.vehiculo.id,
      id_persona: state.personal.id,
      id_cliente:state.cliente.id,
      servicios: state.servicio,
    };
    //console.log(datos)
    setDatos(datos);
    iniciarSolicitud();
  };

  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message);
      navigate("/");
    }
  }, [respuesta, navigate]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
      <Row>
        <Col md={formularioActivo ? 8 : 12}>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h3 className="text-warning">REGISTRAR SERVICIO</h3>
            </Col>
            {state.vehiculo && state.personal && state.cliente && state.servicio.length > 0 && !cargando && (
              <Col className="text-right">
                <Button variant="primary" onClick={registrarServicio}>
                  Registrar
                </Button>
              </Col>
            )}
            {cargando && <Loading />}
            <Row className="w-100">
              {error && <Errofield mensaje={error.message} />}

              {state.vehiculo && (
                <Col>
                  <CardVehiculo
                    vehiculo={state.vehiculo}
                    toErase={() => dispatch({ type: "DATA_REMOVE_VEHICULO" })}
                    isErase={true}
                  />
                </Col>
              )}
              {state.cliente && (
                <Col>
                  <CardCliente
                    cliente={state.cliente}
                    toErase={() => dispatch({ type: "DATA_REMOVE_CLIENTE" })}
                    isErase={true}
                  />
                </Col>
              )}
              {state.personal && (
                <Col>
                  <CardPersonal
                    personal={state.personal}
                    toErase={() => dispatch({ type: "DATA_REMOVE_PERSONAL" })}
                    isErase={true}
                  />
                </Col>
              )}
            </Row>

            <Row className="d-flex justify-content-center align-items-center">
              {!state.vehiculo && (
                <Col md={6}>
                  <FormListVehiculo
                    register={true}
                    onChoose={(vehiculo) =>
                      dispatch({ type: "DATA_VEHICULO", data: vehiculo })
                    }
                    setShowRegisterForm={() => mostrarFormulario("vehiculo")}
                  />
                </Col>
              )}
              {!state.cliente && (
                <Col md={6}>
                  <FormListCliente
                    register={true}
                    onChoose={(cliente) =>
                      dispatch({ type: "DATA_CLIENTE", data: cliente })
                    }
                    setShowRegisterForm={() => mostrarFormulario("cliente")}
                  />
                </Col>
              )}
            </Row>

            {!formularioActivo && (
              <>
                {!state.personal && (
                  <FormListarPersonal
                    register={true}
                    onChoose={(personal) =>
                      dispatch({ type: "DATA_PERSONAL", data: personal })
                    }
                  />
                )}

                {state.servicio.length > 0 && (
                  <ListServicios
                    servicio={state.servicio}
                    isErase={true}
                    inErase={(data) =>
                      dispatch({
                        type: "DATA_REMOVE_SERVICIO",
                        data: { id: data.id },
                      })
                    }
                    title={"SERVICIOS"}
                  />
                )}

                <FormListarServicios
                  register={true}
                  handleDataServicio={(servicio) =>
                    dispatch({
                      type: "DATA_ADD_SERVICIOS",
                      data: servicio,
                    })
                  }
                />
              </>
            )}
          </Row>
        </Col>

        {formularioActivo === "vehiculo" && (
          <Col md={4}>
            <FormRegVehiculo
              dataVehiculo={(vehiculo) => {
                dispatch({ type: "DATA_VEHICULO", data: vehiculo });
                cerrarFormulario();
              }}
              listenerCancel={cerrarFormulario}
            />
          </Col>
        )}

        {formularioActivo === "cliente" && (
          <Col md={4}>
            <FormregistroCliente
              dataCliente={(cliente) => {
                dispatch({ type: "DATA_CLIENTE", data: cliente });
                cerrarFormulario();
              }}
              listenerCancel={cerrarFormulario}
              isregistro={false}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HolderRegistroServicio;
