import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormSearch from "./FormSearch";
import { Form, Row, Table, Button } from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi";
import AlertEmpty from "../Utilidades/AlertEmpty"; // Asegúrate de tener este componente
import Errofield from "../Utilidades/Errorfield/Errorfield"; // Para mostrar errores
import usePetitionGet from "../../hook/usePetitionGet"; // Asegúrate de tener este hook implementado
import ListFormServicio from "./ListFormServicio";

const FormListarServicios = ({ register = false, handleDataServicio}) => {
  const [rutaServicio, setRutaServicio] = useState("getServicio");
  const [servicio, setServicio] = useState([]);
  const [dataError, setDataError] = useState();
  const { dato: servicioData, cargando: servicioCargando } = usePetitionGet({
    ruta: rutaServicio,
    islogged: true,
  });


  useEffect(() => {
    if (servicioData) {
      setServicio(servicioData);
      
    }
  }, [servicioData, servicioCargando, rutaServicio]);

  const handleData = (childData) => {
    setRutaServicio(`getServicioData/${childData.dato}`);
  };

  const onbuttonClick = (data) => {
    //console.log("datos:", data);
    handleDataServicio(data)
    // Aquí puedes agregar la lógica para manejar la actualización del costo del servicio
  };

  return (
    <>
      <FormSearch
        placeholder={"Ingresa el servicio"}
        onData={handleData}
        titulo={"Buscar Servicio"}
      />
      {dataError && <Errofield mensaje={dataError} />}
      <Row className={`w-100 ${register ? "body-fixed" : "body-fixed-min"}`}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Servicio</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicio && servicio.length > 0 ? (
              servicio.map((servicio, index) => (
                <tr key={servicio.id}>
                  {!register ? (
                    <>
                      <td>{index + 1}</td>
                      <td>{servicio.tipo}</td>
                      <td>{servicio.costo} Bs.</td>
                      <td>
                        <Button variant="primary">Editar</Button>
                      </td>
                    </>
                  ) : (
                    <td colSpan={4}>
                      <ListFormServicio servicio={servicio} onSelectedServicio={onbuttonClick}/>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <AlertEmpty
                mensaje={
                  "No se encontraron servicios de acuerdo al criterio de búsqueda"
                }
                colNum={4}
              />
            )}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default FormListarServicios;
