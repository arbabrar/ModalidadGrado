import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEditarServicioContext } from "../../context/EditarServicioContext";
import usePetitionGet from "../../hook/usePetitionGet";
import usePetitionPost from "../../hook/usePetitionPost";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import CardVehiculo from "../Cards/CardVehiculo";
import CardPersonal from "../Cards/CardPersonal";
import ListServicios from "../Tables/ListServicios";
import ListProductos from "../Tables/ListProductos";
import FormListarServicios from "../Forms/FormListarServicios";
import FormListaProducto from "../Forms/FormListaProducto";

const HolderEditarServicio = () => {
  const params = useParams();
  const { state, dispatch } = useEditarServicioContext();
  const [ruta] = useState(`getDataServicioByid/${params.id}`);
  const [servicio, setServicio] = useState();
  const navigate = useNavigate();
  const [selectServicio, setSelectServicio] = useState(true); // Controla si añadir servicio o producto

  const {
    dato: servicioData,
    cargando: servicioCargando,
    error: errorGet,
  } = usePetitionGet({
    ruta: ruta,
    islogged: true,
  });
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost("editarServicio", {}, false);

  const agregarServicio = (data) => {
    dispatch({
      type: "ADD_SERVICIO_NUEVO",
      data: data,
    });
  };
  const handleSetProducto = (data) => {
    dispatch({
      type: "ADD_PRODUCTO_NUEVO",
      data: data,
    });
  };
  const handleReponerServicio = (data) => {
    dispatch({
      type: "REMOVE_SERVICIOS_CANCELABLES",
      data: data,
    });
  };
  const handleCancelarNuevoServicio = (data) => {
    dispatch({
      type: "REMOVE_SERVICIO_NUEVO",
      data: data,
    });
  };
  const handleCancelarNuevoProducto = (data) => {
    dispatch({
      type: "REMOVE_PRODUCTO_NUEVO",
      data: data,
    });
  };

  const handleCancelarProducto = (data) => {
    dispatch({
      type: "SET_PRODUCTOS_CANCELABLES",
      data: data,
    });
  };
  const handleReponerProducto = (data) => {
    dispatch({
      type: "REMOVE_PRODUCTOS_CANCELABLES",
      data: data,
    });
  };
  const handleregistroEdicion = () => {
   
    const datos  = {
        id_servicio: params.id,
        serviciosNuevos: state.serviciosNuevos,
        productosNuevos: state.productosNuevos,
        cancelServicio:state.serviciosCancelable,
        cancelProducto:state.productosCancelable
    }
    setDatos(datos);
    iniciarSolicitud();
  }
  useEffect (()=>{
    if (respuesta) {
        alert(respuesta.message);
        navigate("/");
      }
  },[respuesta, navigate])
  const handleRestaurarServicios = () =>{
    dispatch({
        type: "RESET_EDITS"
      });
  }
  const handleCancelarServicio = (data) => {
    //console.log(data);
    dispatch({
      type: "SET_SERVICIOS_CANCELABLES",
      data: data,
    });
  };

  

  useEffect(() => {
    if (servicioData) {
      if (servicioData.status !== 200) {
        alert(servicioData.mensaje);
        navigate("/");
        return;
      }

      setServicio(servicioData.datos);

      if (servicioData.datos.servicios) {
        dispatch({
          type: "SET_SERVICIOS_ORIGINALES",
          data: servicioData.datos.servicios,
        });
      }

      if (servicioData.datos.productos) {
        dispatch({
          type: "SET_PRODUCTOS_ORIGINALES",
          data: servicioData.datos.productos,
        });
      }
    }
  }, [servicioData, navigate, dispatch]);

  return (
    <Container fluid>
      {(servicioCargando || cargando) && <Loading />}
      {(errorGet || error) && (
        <Errofield
          mensaje={(errorGet && errorGet.message) || (error && error.message)}
        />
      )}
      {servicio && (
        <>
          <Row className="mb-4 d-flex align-items-center vh-100">
            <Col md={8}>
              <Row>
                <Col>
                  <h2 className="text-warning mb-0 float-start">
                    Editar Servicio
                  </h2>
                </Col>
                <Col>
                  <div>
                    <Button
                      variant={selectServicio ? "primary" : "secondary"}
                      className="ml-3"
                      onClick={() => setSelectServicio(!selectServicio)}
                    >
                      {selectServicio ? "Añadir Producto" : "Añadir Servicio"}
                    </Button>
                    {state.wasEdit && (
                      <>
                        <Button variant="success" className="ms-1" onClick={handleregistroEdicion}>
                          Registrar
                        </Button>
                        <Button variant="warning" className="ms-1" onClick={handleRestaurarServicios}>
                          Restaurar
                        </Button>
                      </>
                    )}
                    
                    <Button
                      variant="danger"
                      className="ms-1"
                      onClick={() => navigate("/")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Col>
              </Row>

              <Row className="w-100 mt-3">
                <Col md={6}>
                  <CardVehiculo vehiculo={servicio.vehiculo} />
                </Col>
                <Col md={6}>
                  <CardPersonal personal={servicio.personal} />
                </Col>
              </Row>

              <Row className="w-100 mt-3">
                {state.serviciosDisponibles?.length > 0 && (
                  <Col md={state.productosDisponibles?.length > 0 ? 6 : 12}>
                    <ListServicios
                      title={"SERVICIOS ADQUIRIDOS"}
                      servicio={state.serviciosDisponibles}
                      isErase={true}
                      inErase={handleCancelarServicio}
                    />
                  </Col>
                )}
                {state.productosDisponibles?.length > 0 && (
                  <Col md={state.serviciosDisponibles?.length > 0 ? 6 : 12}>
                    <ListProductos
                      productos={state.productosDisponibles}
                      inErase={handleCancelarProducto}
                      isErase={true}
                    />
                  </Col>
                )}
              </Row>
              <Row className="w-100 mt-3">
                {state.serviciosCancelable?.length > 0 && (
                  <Col md={state.productosCancelable?.length > 0 ? 6 : 12}>
                    <ListServicios
                      title={"SERVICIOS CANCELADOS"}
                      servicio={state.serviciosCancelable}
                      isErase={true}
                      inErase={handleReponerServicio}
                      colorTable="danger"
                    />
                  </Col>
                )}
                {state.productosCancelable?.length > 0 && (
                  <Col md={state.serviciosCancelable?.length > 0 ? 6 : 12}>
                    <ListProductos
                      productos={state.productosCancelable}
                      colorTable="danger"
                      titulo="PRODUCTOS CANCELADOS"
                      isErase={true}
                      inErase={handleReponerProducto}
                    />
                  </Col>
                )}
              </Row>
              <Row className="w-100 mt-3">
                {state.serviciosNuevos?.length > 0 && (
                  <Col md={state.productosNuevos?.length > 0 ? 6 : 12}>
                    <ListServicios
                      title={"NUEVO SERVICIO"}
                      servicio={state.serviciosNuevos}
                      isErase={true}
                      inErase={handleCancelarNuevoServicio}
                      colorTable="primary"
                    />
                  </Col>
                )}
                {state.productosNuevos?.length > 0 && (
                  <Col md={state.serviciosNuevos?.length > 0 ? 6 : 12}>
                    <ListProductos
                      productos={state.productosNuevos}
                      colorTable="primary"
                      titulo="NUEVO PRODUCTOS"
                      isErase={true}
                      inErase={handleCancelarNuevoProducto}
                    />
                  </Col>
                )}
              </Row>
            </Col>

            <Col md={4} className="d-flex flex-column justify-content-center">
              <Row className="w-100 mt-4 d-flex justify-content-center">
                {selectServicio ? (
                  <FormListarServicios
                    register={true}
                    handleDataServicio={agregarServicio}
                  />
                ) : (
                  <FormListaProducto
                    register={true}
                    onSubmitForm={handleSetProducto}
                  />
                )}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default HolderEditarServicio;
