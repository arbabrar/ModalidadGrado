import { Form, Col, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Errofield from "../Utilidades/Errorfield/Errorfield";

const FormRegistroGasto = ({ onSubmit, gasto, personalList = [], isLoading }) => {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();

  // Establecer valores del formulario cuando el gasto cambia
  useEffect(() => {
    if (gasto) {
      setValue("id_personal", gasto.id_personal);
      setValue("detalle", gasto.detalle);
      setValue("fecha", gasto.fecha);
      setValue("monto", gasto.monto);
      setValue("nro_factura", gasto.nro_factura);
      setValue("proveedor", gasto.proveedor);
      setValue("metodo_pago", gasto.metodo_pago); // Establecer método de pago si existe
    }
  }, [gasto, setValue]);

  // Observar el valor actual de id_personal
  const selectedPersonal = watch("id_personal");

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-warning">{gasto ? "Editar Gasto" : "Registrar Gasto"}</h2>

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
          <Form.Group controlId="detalle">
            <Form.Label>Detalle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el detalle"
              {...register("detalle", {
                required: "El detalle es obligatorio",
                maxLength: { value: 150, message: "El detalle no debe exceder los 150 caracteres" },
              })}
            />
            {errors.detalle && <Errofield mensaje={errors.detalle.message} />}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", { required: "La fecha es obligatoria" })}
            />
            {errors.fecha && <Errofield mensaje={errors.fecha.message} />}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="monto">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Ingresa el monto"
              {...register("monto", {
                required: "El monto es obligatorio",
                min: { value: 0.01, message: "El monto debe ser mayor a 0" },
              })}
            />
            {errors.monto && <Errofield mensaje={errors.monto.message} />}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="nro_factura">
            <Form.Label>Nro Factura</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nro de factura (opcional)"
              {...register("nro_factura", {
                maxLength: { value: 50, message: "El número de factura no debe exceder los 50 caracteres" },
              })}
            />
            {errors.nro_factura && <Errofield mensaje={errors.nro_factura.message} />}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="proveedor">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el proveedor"
              {...register("proveedor", {
                required: "El proveedor es obligatorio",
                maxLength: { value: 100, message: "El proveedor no debe exceder los 100 caracteres" },
              })}
            />
            {errors.proveedor && <Errofield mensaje={errors.proveedor.message} />}
          </Form.Group>
        </Col>
      </Row>

      {/* Agregar método de pago */}
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="metodo_pago">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Select
              {...register("metodo_pago", { required: "El método de pago es obligatorio" })}
              defaultValue={gasto?.metodo_pago || ""}
            >
              <option value="">Selecciona el método de pago</option>
              <option value="qr">QR</option>
              <option value="efectivo">Efectivo</option>
              <option value="credito">Crédito</option>
            </Form.Select>
            {errors.metodo_pago && <Errofield mensaje={errors.metodo_pago.message} />}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Button type="submit" variant="primary" disabled={isLoading} className="w-100">
            {gasto ? "Actualizar" : "Registrar"}
          </Button>
        </Col>
      </Row>

      {isLoading && <p>Cargando...</p>}
    </Form>
  );
};

export default FormRegistroGasto;
