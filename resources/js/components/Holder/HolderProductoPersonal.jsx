import { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import usePetitionGet from "../../hook/usePetitionGet";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionPost from "../../hook/usePetitionPost";
import CardPersonal from "../Cards/CardPersonal";
import FormListaProducto from "../Forms/FormListaProducto";
import ListProductos from "../Tables/ListProductos";

const HolderProductoPersonal = () => {
  const params = useParams();
  const [personal, setPersonal] = useState();
  const [listaProducto, setListaProducto] = useState([]); // Estado para los productos
  const [rutaGet] = useState(`getPersonal/${params.id}`);
  const navigate = useNavigate();
  const {
    dato: personaData,
    cargando: personaCargando,
    error: errorGet,
  } = usePetitionGet({
    ruta: rutaGet,
    islogged: true,
  });
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } =
    usePetitionPost("setProductoPersonal", {}, false);

  // Actualiza el estado del personal cuando llega la información
  useEffect(() => {
    if (personaData) {
      setPersonal(personaData);
    }
  }, [personaData, rutaGet]);
  useEffect (()=>{
    if (respuesta) {
        alert(respuesta.message);
        navigate("/");
      }
  },[respuesta, navigate])
  // Manejar la adición de productos al arreglo listaProducto
  const handleSetProducto = (producto) => {
    setListaProducto((prevLista) => [...prevLista, producto]); // Añadir producto a la lista actual
    console.log("Producto añadido:", producto);
  };

  const handleQuitarProducto =(dato) =>{
    setListaProducto((prevLista) =>
      prevLista.filter((p) => p.id !== dato.id) // Filtrar los productos que no coinciden con el ID
    );
  } 
  const handleProdcutoPersonal = () => {
    const data ={
        id_personal :params.id,
        productos:listaProducto
    }
    setDatos(data);
    iniciarSolicitud();
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center principal-container">
    <Row className="mb-4 w-100">
        <Col>
            <h2 className="text-warning mb-0 float-start">
                    Productos Personal
            </h2>
        </Col>
        <Col>
                  <div>
                    {listaProducto.length > 0 && (
                      
                        <Button variant="success" className="ms-1" onClick={handleProdcutoPersonal}>
                          Registrar
                        </Button>
                       
                    )}
                    <Button
                      variant="danger"
                      className="ms-1"
                      onClick={() => navigate("/")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Col>
    </Row>
      <Row>
        {(personaCargando || cargando) && <Loading />}
        {(errorGet || error) && (
          <Errofield
            mensaje={(errorGet && errorGet.message) || (error && error.message)}
          />
        )}
      </Row>
      <Row className="w-100">
        {personal && <CardPersonal personal={personal} />}
      </Row>
      <Row className="w-100">
        
        {listaProducto.length > 0 && (
            <ListProductos
            productos={listaProducto}
            colorTable="dark"
            titulo="PRODUCTOS ADQUIRIDOS"
            isErase={true}
            inErase={handleQuitarProducto}
          />
         
           
         
        )}
      </Row>
      <Row>
        {/* Formulario para añadir productos */}
        <FormListaProducto register={true} onSubmitForm={handleSetProducto} />
      </Row>
    </Container>
  );
};
export default HolderProductoPersonal;
