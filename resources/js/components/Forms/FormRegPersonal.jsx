import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Loading from "../Utilidades/Loading/Loading";
import { useEffect } from "react";

const FormRegPersonal = ({ personal, onSubmit, cargando, error, isregister=true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  // Pre-cargar los valores si existen datos de personal
  useEffect(() => {
    if (personal) {
      setValue("nombre", personal.nombre);
      setValue("apellido", personal.apellido);
      setValue("documento", personal.documento);
      setValue("celular", personal.celular);
      setValue("fecha_nacimiento", personal.fecha_nacimiento);
      setValue("direccion", personal.direccion);
    }
  }, [personal, setValue]);

  // Lógica cuando se envía el formulario
  const handleFormSubmit = (data) => {
    const datosConvertidos = {
      nombre: data.nombre.toUpperCase(),
      apellido: data.apellido.toUpperCase(),
      documento: data.documento,
      celular: data.celular,
      fecha_nacimiento: data.fecha_nacimiento,
      direccion: data.direccion.toUpperCase(),
    };
    onSubmit(datosConvertidos); // Enviar datos convertidos al padre
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit(handleFormSubmit)} className="w-50">
        <h3 className="text-warning">
          {
            isregister  ? 'Registro de Personal' : 'Editar Datos de Personal'
          }
        </h3>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
              />
              {errors.nombre && (
                <p className="text-danger">{errors.nombre.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa los apellidos"
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                })}
              />
              {errors.apellido && (
                <p className="text-danger">{errors.apellido.message}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="documento">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa nro de documento"
                {...register("documento", {
                  required: "El documento es obligatorio",
                })}
              />
              {errors.documento && (
                <p className="text-danger">{errors.documento.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="celular">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa número de celular"
                {...register("celular", {
                  required: "El celular es obligatorio",
                })}
              />
              {errors.celular && (
                <p className="text-danger">{errors.celular.message}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa dirección"
                {...register("direccion", {
                  required: "La dirección es obligatoria",
                })}
              />
              {errors.direccion && (
                <p className="text-danger">{errors.direccion.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="fecha_nacimiento">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                {...register("fecha_nacimiento", {
                  required: "La fecha de nacimiento es obligatoria",
                })}
              />
              {errors.fecha_nacimiento && (
                <p className="text-danger">{errors.fecha_nacimiento.message}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Botón de enviar */}
        {!cargando && (
          <Row className="mt-3">
            <Col md={6}>
              <Button variant={isregister ? "primary" : "info"} type="submit" className="w-100">
                {isregister ? "Registrar" : "Actualizar"}
              </Button>
            </Col>
          </Row>
        )}

        {/* Loading y errores */}
        {cargando && <Loading />}
        {error && <p className="text-danger">Error: {error.message}</p>}
      </Form>
    </Container>
  );
};

export default FormRegPersonal;
