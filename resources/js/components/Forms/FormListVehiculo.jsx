import {  Row, Table } from "react-bootstrap";
import FormSearch from "./FormSearch";
import { useEffect, useState } from "react";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionGet from "../../hook/usePetitionGet";
import AlertEmpty from "../Utilidades/AlertEmpty";
import { FaHistory } from "react-icons/fa";
import Loading from "../Utilidades/Loading/Loading";
import { IoMdPeople } from "react-icons/io";

const FormListVehiculo = ({ register = false, onChoose , setShowRegisterForm}) => {
  const [rutaVehiculo, setRutaVehiculo] = useState();
  const [vehiculo, setVehiculo] = useState([]); // Inicializar como arreglo vacío
  const [dataError, setDataError] = useState();
  const { dato: vehiculoData, cargando: vehiculoCargando, error } = usePetitionGet({
    ruta: rutaVehiculo,
    islogged: true,
  });

  useEffect(() => {
    if (vehiculoData) {
      setVehiculo(vehiculoData);
    }
    
  }, [vehiculoData, vehiculoCargando, error]);

  const handleData = (childData) => {
    setRutaVehiculo(`getVehiculoData/${childData.dato}`);
  };

  const historialVehiculo = (id) => {
    // Lógica para historial de vehículo (puedes agregar la función completa aquí)
    console.log("Ver historial del vehículo con ID:", id);
  };

  const seleccionarVehiculo = (vehiculo) => {
    if (onChoose) {
      onChoose(vehiculo);
    }
  };
  const handleButtonClick = (value) => {
    setShowRegisterForm(value);
  };

  return (
       <>
      <FormSearch
        placeholder={"Ingrese el número de placa"}
        onData={handleData}
        titulo={"Buscar Vehículo"}
      />
      {dataError && <Errofield mensaje={dataError} />}
      <Row className="w-100">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculo && vehiculo.length > 0 ? (
              vehiculo.map((vehiculo, index) => (
                <tr key={vehiculo.id}>
                  <td>{index + 1}</td>
                  <td>{vehiculo.placa}</td>
                  <td>{vehiculo.marca}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.color}</td>
                  <td>{vehiculo.tipo}</td>
                  <td>
                    {
                      !register ? (
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
                          onClick={() => seleccionarVehiculo(vehiculo)}
                        >
                          Seleccionar
                        </button>
                      )
                    }
                  </td>
                </tr>
              ))
            ) : (
              <AlertEmpty
                mensaje={"No se encontraron vehículos de acuerdo al criterio de búsqueda"}
                onButtonClick={handleButtonClick}
                colNum={7}
                ruta={"/registroVehiculo"}
              />
            )}
          </tbody>
        </Table>
        {vehiculoCargando && <Loading />}
      </Row>
      </> 
  );
};

export default FormListVehiculo;
