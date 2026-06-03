import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import usePetitionPost from "../../hook/usePetitionPost";
import FormRegPersonal from "../Forms/FormRegPersonal.jsx";
import Loading from "../Utilidades/Loading/Loading.jsx";
import Errofield from "../Utilidades/Errorfield/Errorfield.jsx";

const HolderRegistroPersonal = () => {

  const navigate = useNavigate();

  // Hook para el POST de edición de personal
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost("savePersonal", {}, false);


  const handleRegistrarPersonal = (data) => {
    setDatos(data); // Preparar los datos para la solicitud
    iniciarSolicitud(); // Ejecutar la solicitud POST para editar el personal
  };

  // Redirigir al usuario y mostrar mensaje si la edición es exitosa
  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message); // Mostrar mensaje de éxito
      navigate("/listaPersonal"); // Redirigir después de la edición
    }
    
  }, [respuesta, navigate, error]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Row className="w-100">
            {cargando && <Loading />}
            {error && <Errofield mensaje={error.message} />}
        </Row>
        <Row className="w-100">
            <FormRegPersonal  onSubmit={handleRegistrarPersonal} isregister={true}/>
        </Row>
      
    
      
    </Container>
  );
};

export default HolderRegistroPersonal;
