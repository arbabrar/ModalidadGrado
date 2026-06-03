import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePetitionPost from "../../hook/usePetitionPost";
import { Container, Row } from "react-bootstrap";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionGet from "../../hook/usePetitionGet";
import ListFormProducto from "../Forms/ListFormProducto";

const HolderEditarProducto = () => {
  const params = useParams();
  const [producto, setProducto] = useState(null);
  const [rutaGet] = useState(`getProductoById/${params.id}`);
  const navigate = useNavigate();
  
  // Fetch para obtener los datos del producto
  const { dato: productoData, cargando: productoCargando, error: errorGet } = usePetitionGet({
    ruta: rutaGet,
    islogged: true,
  });

  // Hook para el POST de edición de producto
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost(`editProducto/${params.id}`, {}, false);

  useEffect(() => {
    if (productoData) {
      setProducto(productoData); // Establecer los datos del producto
    }
  }, [productoData]);

  useEffect(() => {
    if (respuesta) {
      alert(respuesta.message); // Mostrar mensaje de éxito
      navigate("/listaProducto"); // Redirigir después de la edición
    }
    console.log(error)
    
  }, [respuesta, navigate, error]);

  // Manejar la edición del producto
  const handleEditProducto = (data) => {
    const dataConert = {
        nombreproducto:data.nombreproducto.toUpperCase(),
        costo:data.costo
        
    }
    setDatos(dataConert); // Preparar los datos para la solicitud
    iniciarSolicitud(); // Ejecutar la solicitud POST para editar el producto
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row >
        {(productoCargando || cargando) && <Loading />} 
        {(errorGet || error) && (
          <Errofield mensaje={(errorGet && errorGet.message) || (error && error.message)} />
        )}
      </Row>
      
      {/* Renderizar el formulario solo si el producto ha sido cargado */}
      <Row>
        {producto && (
          <ListFormProducto producto={producto} onSelectedProducto={handleEditProducto} isedit={true} />
        )}
      </Row>
    </Container>
  );
};

export default HolderEditarProducto;
