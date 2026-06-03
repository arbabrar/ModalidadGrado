import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import usePetitionPost from "../../hook/usePetitionPost";
import { useNavigate } from "react-router-dom";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
const FormRegVehiculo = ({dataVehiculo, listenerCancel}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost("saveVehiculo", {}, false);
  const onSubmit = (data) => {
    const dataFormat = {
      placa: data.placa.toUpperCase(),
      marca: data.marca.toUpperCase(),
      color: data.color.toUpperCase(),
      clase: data.clase.toUpperCase(),
      modelo: data.modelo.toUpperCase(),
      tipo: data.tipo.toUpperCase(),
    };
    setDatos(dataFormat);
    iniciarSolicitud();
  };
  const handleCancelClick =(value) =>{
    listenerCancel(value)
  }
  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message);
      //navigate("/");
      dataVehiculo(respuesta.vehiculo)
    }
  }, [respuesta, navigate]);

  return (
    <Row className="d-flex justify-content-center vh-100 principal-container">
      <Form onSubmit={handleSubmit(onSubmit)} >
        <h3 className="text-warning">Registro de Vehículo</h3>
        <Row>
          <Col md={6}>
            <Form.Group controlId="placa">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la placa"
                {...register("placa", {
                  required: "La placa es obligatoria",
                })}
              />
              {error?.placa && <Errofield mensaje={error.placa[0]}/>} 
              {errors.placa && (
                <Errofield mensaje={errors.placa.message} />
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="clase">
              <Form.Label>Clase</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la clase"
                {...register("clase", {
                  required: "La clase es obligatoria",
                })}
              />
              {error?.clase && <Errofield mensaje={error.clase[0]}/>} 
              {errors.clase && (
                <Errofield mensaje={errors.clase.message}/>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el color"
                {...register("color", {
                  required: "El color es obligatorio",
                })}
              />
              {error?.color && <Errofield mensaje={error.color[0]}/>} 

              {errors.color && (
                <Errofield mensaje={errors.color.message}/>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="modelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el modelo"
                {...register("modelo", {
                  required: "El modelo es obligatorio",
                })}
              />

              {error?.modelo && <Errofield mensaje={error.modelo[0]}/>}
              {errors.modelo && (
                <Errofield mensaje={errors.modelo.message}/>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="marca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la marca"
                {...register("marca", {
                  required: "La marca es obligatoria",
                })}
              />
               {error?.marca && <Errofield mensaje={error.marca[0]}/>} 

              {errors.marca && (
                <Errofield mensaje={errors.marca.message}/>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="tipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el tipo"
                {...register("tipo", {
                  required: "El tipo es obligatorio",
                })}
              />

              {error?.tipo && <Errofield mensaje={error.tipo[0]}/>} 
              {errors.tipo && (
                <Errofield mensaje={errors.tipo.message}/>
              )}
            </Form.Group>
          </Col>
        </Row>
        {!cargando && (
          <Row className="mt-3">
            <Col md={12}>
              <Button variant="primary" type="submit" className="w-50">
                Enviar
              </Button>
              <Button variant="danger" className="w-50"  onClick={() => handleCancelClick(false)}>
                Cancelar
              </Button>
            </Col>
          </Row>
        )}
        {error && <Errofield mensaje={`Error: ${error.message}`} />}

        {cargando && <Loading />}
      </Form>
    </Row>
  );
};
export default FormRegVehiculo;
