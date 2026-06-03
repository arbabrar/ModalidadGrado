import { Form, Col, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Errofield from "../Utilidades/Errorfield/Errorfield";

const ListFormServicio = ({ servicio, onSelectedServicio, isregistro=false }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Si existe el servicio, precarga los valores
  useEffect(() => {
    if (servicio) {
      setValue("tipo", servicio.tipo);
      setValue("costo", servicio.costo);
    }
  }, [servicio, setValue]);
  const onSubmit= (data)=>{
        data.id = servicio.id
        onSelectedServicio(data)
 }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="align-items-end"> {/* Alinea todos los campos hacia abajo */}
        <Col md={4}>
          <Form.Group controlId="tipo">
            {isregistro &&  <Form.Label>Tipo de Servicio</Form.Label>}
           
            <Form.Control
              type="text"
              placeholder="Ingresa el tipo de servicio"
              {...register("tipo", {
                required: "El tipo de servicio es obligatorio",
              })}
            />
            {errors.tipo && (
                <Errofield mensaje={errors.tipo.message} />
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="costo">
            {isregistro && <Form.Label>Costo</Form.Label>}
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Ingresa el costo"
              {...register("costo", {
                required: "El costo es obligatorio",
                min: {
                  value: 0.01,
                  message: "El costo debe ser mayor que 0",
                },
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "El costo debe ser un número válido con hasta dos decimales",
                },
              })}
            />
            {errors.costo && (
                <Errofield mensaje={errors.costo.message} />
              
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Button type="submit" variant="success">
            Seleccionar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ListFormServicio;
