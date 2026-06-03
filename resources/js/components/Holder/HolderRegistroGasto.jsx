import { Container, Row } from "react-bootstrap";
import FormRegistroGasto from "../Forms/FormRegistroGasto";
import { useState, useEffect } from "react";
import usePetitionGet from "../../hook/usePetitionGet";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionPost from "../../hook/usePetitionPost";
import { useNavigate } from "react-router-dom";

const HolderRegistroGasto = () =>{
    const [personal, setPersonal] = useState([]);
    const navigate = useNavigate();
    const [ruta, setRuta] = useState("getPersonal");
    const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost('saveGasto', {}, false);
              
    const { dato: personalData, cargando: personalCargando, error: errorGet } = usePetitionGet({
        ruta: ruta,
        islogged: true,
      });
    useEffect(() => {
        if (personalData) {
          setPersonal(personalData);
        }
       
    }, [personalData, personalCargando, ruta, errorGet]);
    const handleSubmitForm =(data) =>{
        const dataConert = {
            detalle:data.detalle.toUpperCase(),
            id_personal:data.id_personal,
            fecha:data.fecha,
            monto:data.monto,
            nro_factura:data.nro_factura,
            proveedor:data.proveedor.toUpperCase(),
            metodo_pago:data.metodo_pago
        
        }
        setDatos(dataConert); // Preparar los datos para la solicitud
        iniciarSolicitud();
    }
    useEffect(() => {
        if (respuesta) {
          alert(respuesta.message); // Mostrar mensaje de éxito
          navigate("/"); // Redirigir después de la edición
        }
        
        
      }, [respuesta, navigate, error]);
    return(
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Row className="w-100">
                {personalCargando || cargando && <Loading/>}
                {errorGet && <Errofield mensaje={errorGet.message} />}
            </Row>
            <Row className="w-100">
            <FormRegistroGasto isLoading={personalCargando} personalList={personal} onSubmit={handleSubmitForm}/>
            </Row>
            
        </Container>
    )
}

export default HolderRegistroGasto;