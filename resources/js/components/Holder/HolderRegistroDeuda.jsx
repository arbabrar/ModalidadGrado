import { Container, Row } from "react-bootstrap";
import FormRegistroDeuda from "../Forms/FormRegistroDeuda";
import usePetitionPost from "../../hook/usePetitionPost";
import { useNavigate } from "react-router-dom";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import { useEffect } from "react";

const HolderRegistroDeuda = () => {
  const navigate = useNavigate();
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost("saveDeuda", {}, false);
  
  const handleRegisterDeuda = (data) => {
    const dataConvertido = {
      descripcion: data.descripcion.toUpperCase(),
      estado: data.estado,
      fecha_generacion: data.fecha_generacion,
      fecha_vencimiento: data.fecha_vencimiento,
      id_personal: data.id_personal,
      monto_total: data.monto_total
    };

    setDatos(dataConvertido); // Preparar los datos para la solicitud
    iniciarSolicitud();
  };

  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message); // Mostrar mensaje de éxito
      navigate("/"); // Redirigir después de la respuesta exitosa
    }
  }, [respuesta, navigate]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row className="w-100">
         {error && <Errofield mensaje={error.message} />}
        <FormRegistroDeuda onSubmit={handleRegisterDeuda} isLoading={cargando} />
      </Row>
    </Container>
  );
};

export default HolderRegistroDeuda;
