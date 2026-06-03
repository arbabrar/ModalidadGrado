import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionPost from "../../hook/usePetitionPost";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Utilidades/Loading/Loading";

const FormProductosReg = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { initialdata, setInitialdata } = useState({});
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost('saveProducto', initialdata, false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const dataFormat = {
      nombreproducto: data.nombreproducto.toUpperCase(),
      unidadMedida: data.unidadMedida.toUpperCase(),
      cantidad: data.cantidad,
      costo: data.costo,
    };
    setDatos(dataFormat);
    iniciarSolicitud();
  };
  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message);
      navigate("/");
    }
  }, [respuesta, navigate]);
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3>Registro de Productos</h3>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nombreproducto">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                {...register("nombreproducto", {
                  required: "El nombre del producto es obligatorio.",
                })}
                isInvalid={!!errors.nombreproducto}
              />
              {errors.nombreproducto && (
                <Errofield mensaje={errors.nombreproducto.message} />
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="unidadMedida">
              <Form.Label>Unidad de Medida</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unidad de medida"
                {...register("unidadMedida", {
                  required: "La unidad de medida es obligatoria.",
                })}
                isInvalid={!!errors.unidadMedida}
              />
              {errors.unidadMedida && (
                <Errofield mensaje={errors.unidadMedida.message} />
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad"
                {...register("cantidad", {
                  required: "La cantidad es obligatoria.",
                  min: {
                    value: 1,
                    message: "La cantidad debe ser al menos 1.",
                  },
                })}
                isInvalid={!!errors.cantidad}
              />
              {errors.cantidad && (
                <Errofield mensaje={errors.cantidad.message} />
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="costo">
              <Form.Label>Costo</Form.Label>
              <Form.Control
                type="number"
                step="0.01" // Permite decimales
                placeholder="Costo"
                {...register("costo", {
                  required: "El costo es obligatorio.",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message:
                      "El costo debe ser un número válido con hasta dos decimales.",
                  },
                })}
                isInvalid={!!errors.costo}
              />
              {errors.costo && <Errofield mensaje={errors.costo.message} />}
            </Form.Group>
          </Col>
        </Row>
        {!cargando && (
          <Row>
            <Col md={12}>
              <Button variant="primary" type="submit" className="mt-3 w-100">
                Registrar
              </Button>
            </Col>
          </Row>
        )}
        {error && <Errofield mensaje={`Error: ${error.message}`} />}

        {cargando && <Loading />}
      </Form>
    </Container>
  );
};
export default FormProductosReg;
