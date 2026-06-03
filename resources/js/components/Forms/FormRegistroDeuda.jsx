import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionGet from "../../hook/usePetitionGet";
import { useState } from "react";
import Loading from "../Utilidades/Loading/Loading";

const FormRegistroDeuda = ({ onSubmit, deuda, isLoading=false }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [personalList, setPersonalList] = useState([]);
  const { dato: personalData, cargando: personalCargando, errorget } = usePetitionGet({
    ruta: "getPersonal",
    islogged: true,
  });

  useEffect(() => {
    if (personalData) {
      setPersonalList(personalData);
    }
    if (errorget) {
      setDataError("Ocurrió un error al obtener los datos del personal.");
    }
  }, [personalData, personalCargando, errorget]);
  // Establecer valores en el formulario si se edita una deuda
  useEffect(() => {
    if (deuda) {
      setValue("id_personal", deuda.id_personal);
      setValue("descripcion", deuda.descripcion);
      setValue("fecha_generacion", deuda.fecha_generacion);
      setValue("monto_total", deuda.monto_total);
      setValue("estado", deuda.estado);
      setValue("fecha_vencimiento", deuda.fecha_vencimiento);
    }
  }, [deuda, setValue]);

  return (
    
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-warning">{deuda ? "Editar Deuda" : "Registrar Deuda"}</h2>
       {isLoading || personalCargando && <Loading />}
       {errorget && <Errofield mensaje={error.message}/>} 
      <Row>
        <Col md={6}>
          <Form.Group controlId="id_personal">
            <Form.Label>Personal</Form.Label>
            <Form.Select
              {...register("id_personal", { required: "El personal es obligatorio" })}
            >
              <option value="">Selecciona el personal</option>
              {Array.isArray(personalList) && personalList.length > 0 && personalList.map((personal) => (
                <option key={personal.id} value={personal.id}>
                  {personal.nombre} {personal.apellido}
                </option>
              ))}
            </Form.Select>
            {errors.id_personal && <Errofield mensaje={errors.id_personal.message} />}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa una descripción"
              {...register("descripcion", {
                required: "La descripción es obligatoria",
                maxLength: { value: 255, message: "La descripción no debe exceder los 255 caracteres" },
              })}
            />
            {errors.descripcion && <Errofield mensaje={errors.descripcion.message} />}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="fecha_generacion">
            <Form.Label>Fecha de Generación</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha_generacion", { required: "La fecha de generación es obligatoria" })}
            />
            {errors.fecha_generacion && <Errofield mensaje={errors.fecha_generacion.message} />}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="monto_total">
            <Form.Label>Monto Total</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Ingresa el monto total"
              {...register("monto_total", {
                required: "El monto total es obligatorio",
                min: { value: 0.01, message: "El monto total debe ser mayor a 0" },
              })}
            />
            {errors.monto_total && <Errofield mensaje={errors.monto_total.message} />}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
      <Col md={6}>
          <Form.Group controlId="fecha_vencimiento">
            <Form.Label>Fecha de Vencimiento</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha_vencimiento")}
            />
            {errors.fecha_vencimiento && <Errofield mensaje={errors.fecha_vencimiento.message} />}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              {...register("estado", { required: "El estado es obligatorio" })}
            >
              <option value="">Selecciona el estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="pagada">Pagada</option>
              <option value="cancelada">Cancelada</option>
            </Form.Select>
            {errors.estado && <Errofield mensaje={errors.estado.message} />}
          </Form.Group>
        </Col>
      </Row>


      <Button type="submit" variant="primary" className="mt-3 w-100" disabled={isLoading}>
        {deuda ? "Actualizar Deuda" : "Registrar Deuda"}
      </Button>
    </Form>
  );
};

export default FormRegistroDeuda;
