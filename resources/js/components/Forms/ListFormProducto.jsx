import { useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Errofield from "../Utilidades/Errorfield/Errorfield";

const ListFormProducto = ({ producto, onSelectedProducto, isedit = false }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (producto) {
      setValue("nombreproducto", producto.nombreproducto);
      setValue("costo", producto.costo);
    }
  }, [producto, setValue]);

  const onSubmit = (data) => {
    if (!isedit) {
      data.id = producto.id;
    }
    onSelectedProducto(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="align-items-center">
        {isedit && <h3 className="text-warning">Editar Producto</h3>}

        <Col md={7}>
          <Form.Group controlId={`nombreproducto-${producto?.id}`}>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre del producto"
              defaultValue={producto?.nombreproducto}
              {...(isedit
                ? register("nombreproducto", {
                    required: "El nombre del producto es obligatorio",
                  })
                : { disabled: true })}
            />
            {errors.nombreproducto && (
              <Errofield mensaje={errors.nombreproducto.message} />
            )}
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId={`costo-${producto?.id}`}>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Costo"
              {...register("costo", {
                required: "El costo es obligatorio",
                min: {
                  value: 0.01,
                  message: "El costo debe ser mayor que 0",
                },
              })}
            />
            {errors.costo && <Errofield mensaje={errors.costo.message} />}
          </Form.Group>
        </Col>

        <Col md={2}>
          <Button type="submit" variant="success">
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ListFormProducto;
