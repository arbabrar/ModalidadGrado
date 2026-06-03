import { Container, Row } from "react-bootstrap";
import ListGasto from "../Tables/ListGastos";
import usePetitionGet from "../../hook/usePetitionGet";
import { useEffect, useState } from "react";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import DateRangeForm from "../Utilidades/DateRangeform";
import usePetitionPost from "../../hook/usePetitionPost";
import { useNavigate } from "react-router-dom";

const HolderListGasto = () => {
  const [ruta, setRuta] = useState("getGastos");
  const [gasto, setGasto] = useState();
  const navigate = useNavigate();
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost("obtenerGastosPorFecha", {}, false);
  const {
    dato: gastoData,
    cargando: gastoCargando,
    error: errorget,
  } = usePetitionGet({
    ruta: ruta,
    islogged: true,
  });
  useEffect(() => {
    if (gastoData) {
      //console.log(gastoData)
      setGasto(gastoData);
    }
  }, [gastoData, gastoCargando, errorget, ruta]);
  const handleGastoSelected = (data) => {
      navigate(`/editarGasto/${data.id}`)
  };
  const handledateRange = (data) => {
    setDatos(data);
    iniciarSolicitud();
  };

  useEffect(() => {
    if (respuesta) {
      setGasto(respuesta);
    }
  }, [respuesta, error]);
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
      <Row className="w-100">
        {gastoCargando && <Loading />}
        {(errorget || error) && (
          <Errofield
            mensaje={(errorget && errorget.message) || (error && error.message)}
          />
        )}
        <DateRangeForm onDateForm={handledateRange} />
      </Row>
      {gasto && (
        <ListGasto gasto={gasto} ongastoSelected={handleGastoSelected} />
      )}
    </Container>
  );
};
export default HolderListGasto;
