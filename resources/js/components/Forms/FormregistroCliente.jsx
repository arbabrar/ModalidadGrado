import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import usePetitionPost from "../../hook/usePetitionPost";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import { useNavigate } from "react-router-dom";

const FormregistroCliente = ({dataCliente, listenerCancel, isregistro=true}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const tipoCliente = watch("tipo_cliente");
 const navigate = useNavigate();
 const handleCancelClick =(value) =>{
  listenerCancel(value)
}
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost('saveCliente', {}, false);

  const onSubmit = (data) => {
    const datosConvertidos = {
        tipo_cliente: data.tipo_cliente,
        direccion: data.direccion ? data.direccion.toUpperCase() : '',
        telefono: data.telefono || '',
        nit: data.nit || '',
        fecha_nacimiento: data.fecha_nacimiento || '',
        nombre: data.nombre ? data.nombre.toUpperCase() : '',
        apellido_paterno: data.apellido_paterno ? data.apellido_paterno.toUpperCase() : '',
        apellido_materno: data.apellido_materno ? data.apellido_materno.toUpperCase() : '',
        genero: data.genero || '',
        razon_social: data.razon_social ? data.razon_social.toUpperCase() : '',
        no_patron: data.no_patron || '',
        representante_legal: data.representante_legal ? data.representante_legal.toUpperCase() : ''
      };
    setDatos(datosConvertidos)
    iniciarSolicitud()
  };
  useEffect(() => {
      if (respuesta) {
        alert(respuesta.message); // Mostrar mensaje de éxito
       // navigate(`/VehiculosCliente/${respuesta.clase}/${respuesta.id}`); // Redirigir después de la edición
       //console.log(respuesta);
          if(isregistro){
              navigate('/');
          }else{
              dataCliente(respuesta.cliente)
          }
        
      }
      
    }, [respuesta, navigate, error]);

  return (
    <Container className="justify-content-center  principal-container">
      {cargando && <Loading/>}
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded">
        <h2 className="text-center mb-4">Registro de Cliente</h2>
        {error && <Errofield mensaje={error && error.message} /> } 
        <Row className="w-100">
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Cliente</Form.Label>
            <Form.Select
              {...register("tipo_cliente", {
                required: "Seleccione el tipo de cliente",
              })}
            >
              <option value="">Seleccione el tipo</option>
              <option value="natural">Natural</option>
              <option value="juridico">Jurídico</option>
            </Form.Select>
            {errors.tipo_cliente && (
              <p className="text-danger">{errors.tipo_cliente.message}</p>
            )}
          </Form.Group>
        </Row>
        <Row className="w-100">
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                {...register(
                  "direccion",
                  { required: "La dirección es obligatoria" }
                    
                )}
                placeholder="Ingrese la dirección"
              />
              {errors.direccion && (
                <p className="text-danger">{errors.direccion.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                {...register(
                  "telefono",
                  { required: "El teléfono es obligatorio" }
                    
                )}
                placeholder="Ingrese el teléfono"
              />
              {errors.telefono && (
                <p className="text-danger">{errors.telefono.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>NIT</Form.Label>
              <Form.Control
                type="text"
                {...register(
                  "nit",
                  { required: "El NIT es obligatorio" }
                )}
                placeholder="Ingrese el NIT"
              />
              {errors.nit && (
                <p className="text-danger">{errors.nit.message}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        {tipoCliente === "natural" && (
          <>
            <h4>Datos de Cliente Natural</h4>
            <Row className="mb-3">
              <Col>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  {...register("nombre", tipoCliente === "natural"
                    ? { required: "El nombre es obligatorio" }
                    : {}
                )}
                  placeholder="Ingrese el nombre"
                />
                {errors.nombre && (
                  <p className="text-danger">{errors.nombre.message}</p>
                )}
              </Col>
              <Col>
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  type="text"
                  {...register("apellido_paterno",  tipoCliente === "natural"
                    ? {required: "El apellido paterno es obligatorio"} : {}
                )}
                  placeholder="Ingrese el apellido paterno"
                />
                {errors.apellido_paterno && (
                  <p className="text-danger">
                    {errors.apellido_paterno.message}
                  </p>
                )}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  type="text"
                  {...register("apellido_materno", tipoCliente === "natural"
                    ? {required: "El apellido materno es obligatorio"} : {}
                )}
                  placeholder="Ingrese el apellido materno"
                />
                {errors.apellido_materno && (
                  <p className="text-danger">
                    {errors.apellido_materno.message}
                  </p>
                )}
              </Col>
              <Col>
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  {...register("fecha_nacimiento", tipoCliente === "natural"
                    ? {required: "La fecha de nacimiento obligatorio"} : {}
                )}
                />
                {errors.fecha_nacimiento && (
                  <p className="text-danger">
                    {errors.fecha_nacimiento.message}
                  </p>
                )}
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select
                {...register("genero", tipoCliente === "natural"
                    ? {required: "Debe elegir el genero"} : {}
                )}
              >
                <option value="">Seleccione</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Form.Select>
              {errors.genero && (
                <p className="text-danger">{errors.genero.message}</p>
              )}
            </Form.Group>
          </>
        )}

        {tipoCliente === "juridico" && (
          <>
            <h4>Datos de Cliente Jurídico</h4>
            <Form.Group className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                {...register("razon_social", {
                  required: "La razón social es obligatoria",
                })}
                placeholder="Ingrese la razón social"
              />
              {errors.razon_social && (
                <p className="text-danger">{errors.razon_social.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de Patrón</Form.Label>
              <Form.Control
                type="text"
                {...register("no_patron",tipoCliente === "juridico"
                    ? {required: "El número de patrón es obligatorio"} : {}
                )}
                placeholder="Ingrese el número de patrón"
              />
              {errors.no_patron && (
                <p className="text-danger">{errors.no_patron.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Representante Legal</Form.Label>
              <Form.Control
                type="text"
                {...register("representante_legal",tipoCliente === "juridico"
                    ? {required: "El nombre del representante legal es obligatorio"} : {}
                )}
                placeholder="Ingrese el representante legal"
              />
              {errors.representante_legal && (
                <p className="text-danger">
                  {errors.representante_legal.message}
                </p>
              )}
            </Form.Group>
          </>
        )}
        {!cargando && ( <><Button type="submit" className="me-2" variant="success">
          Registrar Cliente
        </Button>
        <Button
                      variant="danger"
                      className="ms-1"
                      onClick={() => handleCancelClick(false)}
                    >
                      Cancelar
                    </Button></>)}
       
      </Form>
    </Container>
  );
};

export default FormregistroCliente;
