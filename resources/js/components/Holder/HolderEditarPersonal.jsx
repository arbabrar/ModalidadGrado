import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import usePetitionPost from "../../hook/usePetitionPost";
import usePetitionGet from "../../hook/usePetitionGet";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import FormRegPersonal from "../Forms/FormRegPersonal.jsx";

const HolderEditarPersonal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [persona, setPersona] = useState(null);
  const [rutaGet] = useState(`getPersonal/${params.id}`)

  // Fetch para obtener los datos del personal
  const { dato: personaData, cargando: personaCargando, error: errorGet } = usePetitionGet({
    ruta: rutaGet,
    islogged: true,
  });

  // Hook para el POST de edición de personal
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost(`editPersonal/${params.id}`, {}, false);

  // Manejar los datos de la persona una vez que se reciben
  useEffect(() => {
    if (personaData) {
      setPersona(personaData);
    }
  }, [personaData, rutaGet]);

  // Manejar la edición de los datos del personal
  const handleEditPersonal = (data) => {
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
                {(personaCargando || cargando) && <Loading />} 
            {(errorGet || error) && (
                <Errofield mensaje={(errorGet && errorGet.message) || (error && error.message)} />
            )} 
      
        </Row>
        <Row className="w-100">
            {persona && <FormRegPersonal personal={persona} onSubmit={handleEditPersonal} isregister={false}/>}
        </Row>
      
    
      
    </Container>
  );
};

export default HolderEditarPersonal;
