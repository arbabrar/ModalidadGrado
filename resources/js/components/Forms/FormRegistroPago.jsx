import { useNavigate, useParams } from "react-router-dom";
import usePetitionGet from "../../hook/usePetitionGet";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import CardVehiculo from "../Cards/CardVehiculo";
import CardPersonal from "../Cards/CardPersonal";
import ListServicios from "../Tables/ListServicios";
import ListProductos from "../Tables/ListProductos";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import usePetitionPost from "../../hook/usePetitionPost";

const FormRegistroPago = () => {
  const params = useParams();
  const [ruta] = useState(`getDataServicioByid/${params.id}`);
  const [servicio, setServicio] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const {
    dato: servicioData,
    cargando: servicioCargando,
    error: errorGet,
  } = usePetitionGet({
    ruta: ruta,
    islogged: true,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost("savePago", {}, false);
  const [cliente, setCliente] = useState();
  useEffect(() => {
    if (servicioData) {
      if (servicioData.status !== 200) {
        alert(servicioData.mensaje);
        navigate("/");
        return;
      }
      setCliente(servicioData.datos.cliente);
      setServicio(servicioData.datos);

      let totalServicio = 0;
      let totalProducto = 0;

      if (servicioData.datos.servicios && servicioData.datos.servicios.length > 0) {
        totalServicio = servicioData.datos.servicios.reduce(
          (total, servicio) => total + parseFloat(servicio.costo),
          0
        );
      }

      if (servicioData.datos.productos && servicioData.datos.productos.length > 0) {
        totalProducto = servicioData.datos.productos.reduce(
          (total, producto) => total + parseFloat(producto.costo),
          0
        );
      }

      setTotal(totalProducto + totalServicio);

      // Establecer el valor por defecto de "monto" y "fecha"
      setValue("monto", (totalProducto + totalServicio).toFixed(2));
      setValue("fecha", dayjs().format("YYYY-MM-DD"));
    }
  }, [servicioData, setValue, navigate]);

  const onSubmit = (data) => {
    const datosConvertidos = {
      ...data,
      id_servicio: params.id,
      monto: total,
       // Asegurar que envíes el total
    };
    //console.log(datosConvertidos)
    setDatos(datosConvertidos); // Setear los datos en la solicitud POST
    iniciarSolicitud(); // Iniciar la solicitud
  };

  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    if (respuesta) {
      const userChoice = window.confirm(`${respuesta.message}\n¿Deseas imprimir el recibo?`);
      if (userChoice) {
        window.open(`${API_URL}getRecibo/${respuesta.id}`, "_blank");
      }
      navigate("/");
    }
  }, [respuesta]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      {(servicioCargando || cargando) && <Loading />}
      {(errorGet || error) && (
        <Errofield
          mensaje={(errorGet && errorGet.message) || (error && error.message)}
        />
      )}
      {servicio && (
        <>
          <Row className="w-100">
            <Col md={6}>
              <CardVehiculo vehiculo={servicio.vehiculo} />
            </Col>
            <Col md={6}>
              <CardPersonal personal={servicio.personal} />
            </Col>
          </Row>

          <Row className="w-100">
            <ListServicios servicio={servicio.servicios} />
          </Row>

          {servicio.productos?.length > 0 && (
            <Row>
              <ListProductos productos={servicio.productos} />
            </Row>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="w-100">
              <Col md={4}>
                <Form.Group controlId="metodo_pago">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Select
                    {...register("metodo_pago", {
                      required: "El método de pago es obligatorio",
                    })}
                  >
                    <option value="">Seleccione un método de pago</option>
                    <option value="credito">Crédito</option>
                    <option value="qr">QR</option>
                    <option value="efectivo">Efectivo</option>
                  </Form.Select>
                  {errors.metodo_pago && (
                    <Errofield mensaje={errors.metodo_pago.message} />
                  )}
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="monto">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={total?.toFixed(2)} // Mostrar el valor calculado
                    readOnly={true} // El monto no debe ser editable
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("fecha", {
                      required: "La fecha es obligatoria",
                    })}
                  />
                  {errors.fecha && <Errofield mensaje={errors.fecha.message} />}
                </Form.Group>
              </Col>
            </Row>

            {/* Razón Social y NIT (Opcionales) */}
            <Row className="w-100 mt-3">
              <Col md={6}>
                <Form.Group controlId="razonsocial">
                  <Form.Label>Razón Social (Opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Razón Social"
                    {...register("razonsocial")}
                    defaultValue={cliente?.nombre || ""}
                    
                  />
                 
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="nit">
                  <Form.Label>NIT (Opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="NIT"
                    {...register("nit")}
                    defaultValue={cliente?.nit || ""}
                  />
                 
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="success" className="mt-3 w-100">
              Registrar Pago
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default FormRegistroPago;
