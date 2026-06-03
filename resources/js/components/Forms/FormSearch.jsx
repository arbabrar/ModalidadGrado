import {Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import { useEffect } from "react";
const FormSearch = ({placeholder, onData, titulo}) =>{
   
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const datosFormat = {
            dato: data.datoinput.toUpperCase()
        };
        onData(datosFormat)
      };
    

    return (
        <Row className="w-75">
            <h3 className="align-self-start">{titulo}</h3>
            <Col>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <InputGroup className="mb-3">
                <Form.Control
                    placeholder={placeholder}
                    type="text"
                    {...register("datoinput", {
                    required: "Este campo es requerido",
                    })}
                    isInvalid={!!errors.datoinput}
                />
                <Button variant="outline-light" type="submit">
                    Buscar
                </Button>
                </InputGroup>
                {errors.datoinput && (
                <Errofield
                    mensaje={errors.datoinput.message || "An error occurred"}
                />
                )}
                
            </Form>
            </Col>
        </Row>
    )
}

export default FormSearch;