import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import Errofield from "./Errorfield/Errorfield";

const DateRangeForm = ({ onDateForm, onPdfForm, withPdf }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    if (e.nativeEvent.submitter.name === "submitPdf") {
      onPdfForm(data); // Llama a la función para generar el PDF
    } else {
      onDateForm(data); // Llama a la función estándar de envío
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="align-items-end">
        <Col xs={5}>
          <Form.Group controlId="dateFrom">
            <Form.Label>Desde</Form.Label>
            <Form.Control
              type="date"
              {...register("dateFrom", { required: true })}
              isInvalid={errors.dateFrom}
            />
            <Form.Control.Feedback type="invalid">
              <Errofield mensaje={"Fecha requerida"} />
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={5}>
          <Form.Group controlId="dateTo">
            <Form.Label>Hasta</Form.Label>
            <Form.Control
              type="date"
              {...register("dateTo", { required: true })}
              isInvalid={errors.dateTo}
            />
            <Form.Control.Feedback type="invalid">
              <Errofield mensaje={"Fecha requerida"} />
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={withPdf ? 1 : 2} className="d-flex align-items-end">
          <Button type="submit" name="submitForm" className="w-100">
            Enviar
          </Button>
        </Col>
        {withPdf && (
          <Col xs={1} className="d-flex align-items-end">
            <Button
              type="submit"
              name="submitPdf"
              className="w-100"
              variant="danger"
            >
              PDF
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default DateRangeForm;
