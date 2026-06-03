import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePetitionGet from "../../hook/usePetitionGet";
import { Container, Row, Table, Button, Form, Col } from "react-bootstrap";
import FormSearch from "./FormSearch";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import AlertEmpty from "../Utilidades/AlertEmpty";
import { BiEditAlt } from "react-icons/bi";
import Loading from "../Utilidades/Loading/Loading";
import ListFormProducto from "./ListFormProducto";
import { useNavigate } from "react-router-dom";

const FormListaProducto = ({ register = false, onSubmitForm }) => {
  const [rutaProducto, setRutaProducto] = useState("getProducto");
  const [producto, setProducto] = useState([]);
  const [dataError, setdataError] = useState();
  const { dato: productoData, cargando: productoCargando } = usePetitionGet({
    ruta: rutaProducto,
    islogged: true,
  });
  const navigate = useNavigate();
  const { register: formRegister, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (productoData) {
      setProducto(productoData);
    }
  }, [productoData, productoCargando, rutaProducto]);

  const handleData = (childData) => {
    setRutaProducto(`getProductoData/${childData.dato}`);
  };
  const editarProducto = (id) =>{
    navigate(`/editarProducto/${id}`);   
     
  }
  const onSubmit = (data) => {
    onSubmitForm(data);
  };

  return (
    <>
        <FormSearch
        placeholder={"Ingresa el nombre del producto"}
        onData={handleData}
        titulo={"Buscar Producto"}
      />
      {dataError && <Errofield mensaje={dataError} />}
      <Row className="w-100">
        {register ? (
          <>
          {producto && producto.length > 0 ? (
            producto.map((producto, index) => (
              <ListFormProducto key={producto.id} onSelectedProducto={onSubmit} producto={producto}/>  
              
            ))
          ) : (
            <Errofield
              mensaje={"No se encontraron productos de acuerdo al criterio de búsqueda"}
              
            />
          )}
        </>
        ) : (
            <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Unidad de medida</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {producto && producto.length > 0 ? (
                producto.map((producto, index) => (
                  <tr key={producto.id}>
                    <td>{index + 1}</td>
                    <td>{producto.nombreproducto}</td>
                    <td>{producto.unidadMedida}</td>
                    <td>{producto.costo} Bs.</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          editarProducto(producto.id)
                        }}
                      >
                        <BiEditAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <AlertEmpty
                  mensaje={"No se encontraron productos de acuerdo al criterio de búsqueda"}
                  colNum={5}
                  ruta={"/registroProducto"}
                />
              )}
            </tbody>
          </Table>
          
        )}
        {productoCargando && !producto.length && <Loading />}
      </Row>
    </>
      
  );
};

export default FormListaProducto;
