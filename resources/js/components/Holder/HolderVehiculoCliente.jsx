import { Col, Container, Row, Button} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import usePetitionGet from "../../hook/usePetitionGet";
import { useEffect, useState, useContext } from "react";
import CardCliente from "../Cards/CardCliente";
import FormListVehiculo from "../Forms/FormListVehiculo";
import { useAsociarClienteVehiculoContext } from "../../context/AsociarClienteVehiculoContext";
import ListVehiculo from "../Tables/ListVehiculo";
import usePetitionPost from "../../hook/usePetitionPost";

const HolderVehiculoCliente = () => {
  const params = useParams();
  const { state, dispatch } = useAsociarClienteVehiculoContext();
  const navigate = useNavigate(); 
  const [cliente, setCliente] = useState();
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
  usePetitionPost("actualizarVehiculosCliente", {}, false);
  const {
    dato: data,
    cargando: cargandoData,
    error: errorData,
  } = usePetitionGet({
    ruta: `getVehiculoCliente/${params.clase}/${params.id}`,
    islogged: true,
  });

  useEffect(() => {
    if (data) {
      setCliente(data);
      
      dispatch({ type: 'CARGAR_VEHICULOS', data: data.vehiculos });
    }
  }, [data, dispatch]);
  useEffect (()=>{
    if (respuesta) {
        alert(respuesta.message);
        navigate("/");
      }
  },[respuesta, navigate])
  const agregarVehiculo = (vehiculo) => {
    dispatch({ type: 'ASOCIAR_NUEVO_VEHICULO', data: vehiculo });
  };

  const handleRemoveAsociados = (vehiculo) => {
    dispatch({ type: 'DESASOCIAR_VEHICULO', data: vehiculo });
  };
  const handleRemoveNuevo = (vehiculo) =>{
    console.log(vehiculo)
    dispatch({ type: 'QUITAR_NUEVO', data: vehiculo });
  }
  const handleregistroAsociacion = () =>{
        const data ={
            nuevos : state.vehiculosNuevos,
            desasociar: state.vehiculosParaDesasociar,
            reasociar:state.vehiculosReasociar,
            idcliente :  params.id
        }
        console.log(data)
        setDatos(data)
        iniciarSolicitud()
  }
  const handleRestaurarAsociacion = () => {
    dispatch({ type: 'LIMPIAR_ESTADO' });
  }
  const handleRestaurarDesasociados =(vehiculo) =>{
    dispatch({ type: 'RESTAURAR_DEASOCIADOS', data: vehiculo });
  }
  const handleReasociar =(vehiculo) =>{
    dispatch({ type: 'REASOCIAR_VEHICULO', data: vehiculo });
  }
  const handleQUitarParaDesasociar =(vehiculo)=>{
    dispatch({ type: 'RESTAURAR_ASOCIADO', data: vehiculo });
  }

  return (
    <Container fluid className="align-items-center justify-content-center principal-container">
      <Row>
      <Row>
                <Col>
                  <h2 className="text-warning mb-0 float-start">
                   VEHICULOS ASOCIADOS AL CLIENTE
                  </h2>
                </Col>
                <Col>
                  <div>
                    {state.wasEdit && (
                      <>
                        <Button variant="success" className="ms-1" onClick={handleregistroAsociacion}>
                          Registrar
                        </Button>
                        <Button variant="warning" className="ms-1" onClick={handleRestaurarAsociacion}>
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
        <Col md={5} className="p-2">
          <Row>
            <CardCliente tipo={params.clase} cliente={cliente} />
          </Row>
          <Row>
            {state.vehiculosAsociados && state.vehiculosAsociados.length > 0 ? (
                <ListVehiculo vehiculos={state.vehiculosAsociados} titulo={"VEHICULOS ASOCIADOS AL CLIENTE"} color={"dark"}  toErase={handleRemoveAsociados} />
            
            ) : (
              <p>No tiene vehículos asociados</p>
            )}
          </Row>
          
            {state.vehiculosNuevos && state.vehiculosNuevos.length > 0 &&
              <Row>
                <ListVehiculo vehiculos={state.vehiculosNuevos} titulo={"VEHICULOS POR ASOCIAR AL CLIENTE"} color={"primary"} toErase={handleRemoveNuevo} />
              </Row> 
            }
            {state.vehiculosDesasociados && state.vehiculosDesasociados.length > 0 &&
              <Row>
                <ListVehiculo vehiculos={state.vehiculosDesasociados} titulo={"VEHICULOS DESASOCIADOS DEL CLIENTE"} color={"warning"} toErase={handleReasociar} />
              </Row> 
            }
            {state.vehiculosParaDesasociar && state.vehiculosParaDesasociar.length > 0 &&
              <Row>
                <ListVehiculo vehiculos={state.vehiculosParaDesasociar} titulo={"VEHICULOS PARA DESASOCIAR AL CLIENTE"} color={"info"} toErase={handleQUitarParaDesasociar} />
              </Row> 
            }
            {state.vehiculosReasociar && state.vehiculosReasociar.length > 0 &&
              <Row>
                <ListVehiculo vehiculos={state.vehiculosReasociar} titulo={"VEHICULOS PARA REASOCIAR AL CLIENTE"} color={"success"} toErase={handleRestaurarDesasociados} />
              </Row> 
            }
          
        </Col>
        <Col md={7} className="d-flex flex-column align-items-center justify-content-center">
          <FormListVehiculo register={true} onChoose={agregarVehiculo} />
        </Col>
      </Row>
    </Container>
  );
};

export default HolderVehiculoCliente;
