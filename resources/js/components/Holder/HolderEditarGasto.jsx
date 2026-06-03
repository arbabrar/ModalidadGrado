import { Container, Row } from "react-bootstrap";
import FormRegistroGasto from "../Forms/FormRegistroGasto";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePetitionGet from "../../hook/usePetitionGet";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionPost from "../../hook/usePetitionPost";

const HolderEditarGasto = () => {
  const params = useParams();
  const [gasto, setGasto] = useState(null);
  const [personal, setPersonal] = useState([]);
  const navigate =useNavigate();
  // Fetch para obtener los datos del gasto
  const { dato: gastoData, cargando: gastoCargando, error: errorGet } = usePetitionGet({
    ruta: `getdataGasto/${params.id}`,
    islogged: true,
  });

  // Fetch para obtener la lista de personal
  const { dato: personalData, cargando: personalCargando, error: errorPersonal } = usePetitionGet({
    ruta: 'getPersonal',
    islogged: true,
  });
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost(`saveEditGasto/${params.id}`, {}, false);
       

  // Combina los efectos de carga de gasto y personal
  useEffect(() => {
    if (gastoData) {
      setGasto(gastoData);
      
    }

    if (personalData) {
       
        setPersonal(personalData);
        
    }
  }, [gastoData, personalData]);

  const onDataSumbmit = (data) =>{
    const dataConert = {
        detalle:data.detalle.toUpperCase(),
        id_personal:data.id_personal,
        fecha:data.fecha,
        monto:data.monto,
        nro_factura:data.nro_factura,
        proveedor:data.proveedor.toUpperCase()
    
    }
    setDatos(dataConert); // Preparar los datos para la solicitud
    iniciarSolicitud();
    
  }
  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message); // Mostrar mensaje de éxito
      navigate("/ListaGasto"); // Redirigir después de la edición
    }
    
    
  }, [respuesta, navigate, error]);
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row>
        {/* Mostrar carga mientras se obtienen los datos */}
        {(gastoCargando || personalCargando || cargando) && <Loading />}

        {/* Mostrar errores de cualquiera de las peticiones */}
        {(errorGet || errorPersonal || error) && (
          <Errofield mensaje={(errorGet?.message || errorPersonal?.message || error?.message)} />
        )}
      </Row>
        <Row className="w-100">

        
      {/* Mostrar el formulario solo si los datos han sido cargados */}
      {gasto && personal && (
        
        <FormRegistroGasto
          gasto={gasto}
          isLoading={gastoCargando}
          personalList={personal}
          onSubmit={onDataSumbmit}
        />
      )}
      </Row>
    </Container>
  );
};

export default HolderEditarGasto;
