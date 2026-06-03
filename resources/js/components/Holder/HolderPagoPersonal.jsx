import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import usePetitionGet from "../../hook/usePetitionGet";
import { useEffect, useState } from "react";
import CardPersonal from "../Cards/CardPersonal";
import ListServicioComision from "../Tables/ListServicioComision";
import CardPago from "../Cards/CardPago";
import ListProductosPersonal from "../Tables/ListProductosPersonal";
import { usePagoPersonalContext } from "../../context/PagoPersonalContext";
import usePetitionPost from "../../hook/usePetitionPost";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";

const HolderPagoPersonal = () => {
  const params = useParams();
  const { state, dispatch } = usePagoPersonalContext();
  const [personal, setPersonal] = useState(null);
  const [deuda, setDeuda] = useState();
  const [montoPagar, setMontoPagar] = useState(0);
  const [totalComision, setTotalComision] = useState(0); // Estado para la suma de las comisiones
  const [totalProductos, setTotalProductos] = useState(0); // Estado para la suma del costo de los productos
  const [saldoFinal, setSaldoFinal] = useState(0); // Estado para el saldo final
  const navigate = useNavigate();
  const {
    dato: pagoData,
    cargando: pagoDataCargando,
    errorGet,
  } = usePetitionGet({
    ruta: `getDataPagoPendientePersonal/${params.id}`,
    islogged: true,
  });
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost("setpagoPersonal", {}, false);

  useEffect(() => {
    if (pagoData) {
      console.log(pagoData)
      const { deuda, personal, servicios, productos } = pagoData.datos;
      if (deuda) {
        setDeuda(deuda);
        setMontoPagar(deuda.cuota);
      }

      if (personal) {
        setPersonal(personal);
      }

      if (servicios) {
        dispatch({
          type: "SET_SERVICIOS_PAGO_ORIGINAL",
          data: servicios,
        });
      }

      if (productos) {
        dispatch({
          type: "SET_PRODUCTOS_PAGO_ORIGINAL",
          data: productos,
        });
      }
    }
  }, [pagoData, dispatch]);
  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message);
      navigate("/listaPersonal");
    }
  }, [respuesta, navigate]);
  // useEffect para calcular las comisiones, productos y saldo final cuando cambien los servicios o productos
  useEffect(() => {
    // Calcular las comisiones de los servicios pendientes
    const comisiones = state.serviciosPendiente.reduce(
      (total, servicio) => total + parseFloat(servicio.comision),
      0
    );
    setTotalComision(comisiones);

    // Calcular los costos de los productos adquiridos
    const productosCostos = state.productosPendiente.reduce(
      (total, producto) => total + parseFloat(producto.costo),
      0
    );
    setTotalProductos(productosCostos);

    // Calcular el saldo final restando los productos de las comisiones
    const saldo = comisiones - (productosCostos + montoPagar);
    setSaldoFinal(saldo);
  }, [state.serviciosPendiente, state.productosPendiente, montoPagar]);

  const onAbortPayment = (dato) => {
    dispatch({
      type: "REMOVE_SERVICIO_PAGO_CANCELABLE",
      data: dato,
    });
  };

  const onNonPayProducto = (dato) => {
    dispatch({
      type: "REMOVE_PRODUCTO_PAGO_CANCELABLE",
      data: dato,
    });
  };
  const handleregistroPago = () => {
    const datosPaga = {
      servicios: state.serviciosPendiente || [], // Asegúrate de que sea un array
      productos: state.productosPendiente || [], // Asegúrate de que sea un array
      id_personal: params.id, // Este valor proviene de los parámetros de la URL
      id_deuda: deuda?.id || 0, // Verifica que `deuda` tenga un ID válido, si no, utiliza 0
      monto_pagar: parseFloat(montoPagar) || 0, // Asegúrate de que `montoPagar` sea un número
    };
    console.log(datosPaga)
    setDatos(datosPaga);
    iniciarSolicitud();
  };
  const onRestorePagoServicio = (dato) => {
    dispatch({
      type: "RESTORE_SERVICIO_PENDIENTE",
      data: dato,
    });
  };
  const handleRestaurar = () => {
    dispatch({
      type: "RESET",
    });
  };
  const onRestorePagoProducto = (dato) => {
    dispatch({
      type: "RESTORE_PRODUCTO_PENDIENTE",
      data: dato,
    });
  };
  const handleLessPay = (keyboard) => {
    if (keyboard === 'add') {
      if (montoPagar < saldoFinal) {
        setMontoPagar(prevMonto => prevMonto + 1);  // Incrementa correctamente
      }
    } else {
      if (montoPagar > deuda.pago_minimo) {
        setMontoPagar(prevMonto => prevMonto - 1);  // Decrementa correctamente
      }
    }
  };
  

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center principal-container"
    >
      {(pagoDataCargando || cargando) && <Loading />}
      {(errorGet || error) && (
        <Errofield
          mensaje={(errorGet && errorGet.message) || (error && error.message)}
        />
      )}
      {personal && (
        <>
          <Row className="w-100">
            <Col md={3}>
              <CardPersonal personal={personal} />
            </Col>
            <Col md={6}>
              <CardPago
                total={saldoFinal}
                totalProducto={totalProductos}
                totalServicio={totalComision}
                cuotaDeuda={montoPagar}
                handleClickDeuda={handleLessPay}
              />
            </Col>
            <Col md={3}>
              {state.wasEdit && (
                <Button
                  variant="warning"
                  className="ms-1"
                  onClick={handleRestaurar}
                >
                  Restaurar
                </Button>
              )}

              {saldoFinal > 0 && (
                <Button
                  variant="success"
                  className="ms-1"
                  onClick={handleregistroPago}
                >
                  Registrar Pago
                </Button>
              )}
              <Button
                variant="danger"
                className="ms-1"
                onClick={() => navigate("/")}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
          <Row className="w-100">
            {state.serviciosPendiente.length > 0 && (
              <Col md={state.productosPendiente.length > 0 ? 7 : 12}>
                <ListServicioComision
                  servicio={state.serviciosPendiente}
                  titulo={"TRABAJOS REALIZADOS"}
                  onLeftServicio={onAbortPayment}
                />
              </Col>
            )}
            {state.productosPendiente.length > 0 && (
              <Col md={state.serviciosPendiente.length > 0 ? 5 : 12}>
                <ListProductosPersonal
                  titulo={"PRODUCTOS ADQUIRIDOS"}
                  productos={state.productosPendiente}
                  onclickProducto={onNonPayProducto}
                />
              </Col>
            )}
          </Row>
          <Row className="w-100">
            {state.serviciosNopago.length > 0 && (
              <Col md={state.productosNopago.length > 0 ? 7 : 12}>
                <ListServicioComision
                  colorTable="warning"
                  servicio={state.serviciosNopago}
                  titulo={"TRABAJOS NO CONTABILIZADO"}
                  onLeftServicio={onRestorePagoServicio}
                />
              </Col>
            )}
            {state.productosNopago.length > 0 && (
              <Col md={state.serviciosNopago.length > 0 ? 5 : 12}>
                <ListProductosPersonal
                  colorTable="danger"
                  titulo={"PRODUCTOS PENDIENTES DE PAGO"}
                  productos={state.productosNopago}
                  onclickProducto={onRestorePagoProducto}
                />
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default HolderPagoPersonal;
