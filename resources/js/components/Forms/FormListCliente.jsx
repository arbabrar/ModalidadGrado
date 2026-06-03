import { useEffect, useState } from "react";
import FormSearch from "./FormSearch";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import { Row, Table } from "react-bootstrap";
import usePetitionGet from "../../hook/usePetitionGet";
import AlertEmpty from "../Utilidades/AlertEmpty";

import { FaHistory } from "react-icons/fa";
import Loading from "../Utilidades/Loading/Loading";
import { IoMdPeople } from "react-icons/io";


const FormListCliente = ({register = false, onChoose , setShowRegisterForm}) => {
  const [dataError, setDataError] = useState();
  const [rutaCliente, setRutaCliente] = useState();
  const [cliente, setCliente] = useState([]); // Inicializar como arreglo vacío
  const { dato: clienteData, cargando: clienteCargando, error } = usePetitionGet({
    ruta: rutaCliente,
    islogged: true,
  });
  useEffect(() => {
      if (clienteData) {
        setCliente(clienteData);
      }
      
    }, [clienteData, clienteCargando, error]);
  
    const handleData = (childData) => {
      setRutaCliente(`getClienteByNombreNIT/${childData.dato}`);
    };
  
     
    const seleccionarCliente = (cliente) => {
      if (onChoose) {
        onChoose(cliente);
      }
    };
    const handleButtonClick = (value) => {
      setShowRegisterForm(value);
    };
  return (
    <>
      <FormSearch
        placeholder={"Ingrese el nombre o Nro de NIT"}
        onData={handleData}
        titulo={"Buscar Cliente"}
      />
      {dataError && <Errofield mensaje={dataError} />}
      <Row className="w-100">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>NIT</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cliente && cliente.length > 0 ? (
              cliente.map((cliente, index) => (
                <tr key={cliente.id}>
                  <td>{index + 1}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.nit}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td>
                    {!register ? (
                      <>
                        <button
                          className="btn btn-warning"
                          onClick={() => historialVehiculo(vehiculo.id)}
                        >
                          <FaHistory />
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => historialVehiculo(vehiculo.id)}
                        >
                          <IoMdPeople />
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => seleccionarCliente(cliente)}
                      >
                        Seleccionar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <AlertEmpty
                mensaje={
                  "No se encontraron clientes de acuerdo al criterio de búsqueda"
                }
                onButtonClick={handleButtonClick}
                colNum={7}
                ruta={"/registroVehiculo"}
              />
            )}
          </tbody>
        </Table>
        {clienteCargando && <Loading />}
      </Row>
    </>
  );
};

export default FormListCliente;
