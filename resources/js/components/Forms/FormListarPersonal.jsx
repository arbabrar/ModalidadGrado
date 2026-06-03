import { useEffect, useState } from "react";
import FormSearch from "./FormSearch";
import Errorfield from "../Utilidades/Errorfield/Errorfield";
import { Row, Table } from "react-bootstrap";
import Loading from "../Utilidades/Loading/Loading";
import usePetitionGet from "../../hook/usePetitionGet";
import { FaUserEdit } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import AlertEmpty from "../Utilidades/AlertEmpty";
import { useNavigate } from "react-router-dom";

const FormListarPersonal = ({ register = false, onChoose }) => {
  const [personal, setPersonal] = useState([]); // Inicializado como arreglo vacío
  const [ruta, setRuta] = useState("getPersonal");
  const navigate = useNavigate()
  const { dato: personalData, cargando: personalCargando, error } = usePetitionGet({
    ruta: ruta,
    islogged: true,
  });
  const [dataError, setDataError] = useState(null);

  const seleccionarPersonal = (persona) => {
    if (onChoose) {
      onChoose(persona);
    }
  };

  const handleData = (childData) => {
    setRuta(`getPersonalData/${childData.dato}`);
  };

  useEffect(() => {
    if (personalData) {
      setPersonal(personalData);
    }
    if (error) {
      setDataError("Ocurrió un error al obtener los datos del personal.");
    }
  }, [personalData, personalCargando, ruta, error]);

  const editarPersona = (id) => {
    navigate(`/editarPersonal/${id}`);
    // Implementa la lógica de edición
  };

  const pagarPersona = (id) => {
    navigate(`/getDataPagoPersonal/${id}`);
    // Implementa la lógica de pago
  };

  const productoPersona = (id) => {
      navigate(`/setProductoPersonal/${id}`);
    // Implementa la lógica de productos
  };

  return (
   <>
      <FormSearch
        placeholder={"Ingrese Nro de documento o nombre"}
        onData={handleData}
        titulo={"Buscar Personal"}
      />

      {dataError && <Errorfield mensaje={dataError} />}
      <Row className={`w-100 ${register ? "body-fixed" : "body-fixed-min"}`}>
        {personalCargando && <Loading />} {/* Mostrar carga antes de los datos */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Nro Documento</th>
              <th>Nro Celular</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {personal && personal.length > 0 ? (
              personal.map((persona, index) => (
                <tr key={persona.id}>
                  <td>{index + 1}</td>
                  <td>
                    {persona.nombre} {persona.apellido}
                  </td>
                  <td>{persona.documento}</td>
                  <td>{persona.celular}</td>
                  <td>
                    {!register ? (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => editarPersona(persona.id)}
                        >
                          <FaUserEdit />
                        </button>{" "}
                        |
                        <button
                          className="btn btn-success ml-2"
                          onClick={() => pagarPersona(persona.id)}
                        >
                          <FaMoneyBillTrendUp />
                        </button>{" "}
                        |
                        <button
                          className="btn btn-warning"
                          onClick={() => productoPersona(persona.id)}
                        >
                          <MdOutlineProductionQuantityLimits />
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => seleccionarPersonal(persona)}
                      >
                        Seleccionar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <AlertEmpty
                mensaje={"No se encontró personal de acuerdo al criterio de búsqueda"}
                colNum={5}
                ruta={'/registroPersonal'}
              />
            )}
          </tbody>
        </Table>
      </Row>
      </>
  );
};

export default FormListarPersonal;
