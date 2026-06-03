import { Container, Row, Col, Table } from "react-bootstrap";
import DateRangeForm from "../Utilidades/DateRangeform";
import usePetitionGet from "../../hook/usePetitionGet";
import { useEffect, useState } from "react";
import ListReportResumen from "../Tables/ListReportResumen";
import Loading from "../Utilidades/Loading/Loading";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import ListProductoPersonalReport from "../Tables/ListProductoPersonalReport";
import ListProductoServicioReport from "../Tables/ListProductoServicioReport";
import ListGastoReport from "../Tables/ListGastoReport";
import ListDeudas from "../Tables/ListDeudas";

const HolderReports = () => {
  const [ruta, setRuta] = useState("getDataReport");
  const [dator, setDator] = useState(null); // Inicialmente null
  const [totalCostoProductoPersonal, setTotalCostoProductoPersonal] =
    useState(0);
  const [totalCostoProductoServicio, setTotalCostoProductoServicio] =
    useState(0);
  const [totalGasto, setTotalGasto] = useState(0);
  const [deuda, setDeuda]= useState(0);
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [totalGastoEfectivo, setTotalGastoEfectivo] = useState(0);
  const [totalCostoLavado, setTotalCostoLavado] = useState(0);
  const [totalComisionLavado, setTotalComisionLavado] = useState(0);
  const [totalIngresoLavado, setTotalIngresoLavado] = useState(0);
  const [efectivoFinal, setEfectivoFinal] = useState(0);
  const [qrFinal, setQrFinal] = useState(0);
  const [pendiente, setPendiente] = useState(0);

  const {
    dato: reportData,
    cargando: reportCargando,
    error: errorGet,
  } = usePetitionGet({
    ruta: ruta,
    islogged: true,
  });
  useEffect(() => {
    const totalI =
      totalCostoLavado +
      totalCostoProductoPersonal +
      totalCostoProductoServicio+deuda;
    setIngresos(totalI);
    const totalE = totalComisionLavado+ totalGastoEfectivo + pendiente;
    setEgresos(totalE)

    const EfectivoFinal = (totalI - totalE) - qrFinal;

    setEfectivoFinal(EfectivoFinal)

  }, [
    totalCostoLavado,
    totalCostoProductoPersonal,
    totalCostoProductoServicio,
    deuda
  ]);
  useEffect(() => {
    if (reportData) {
      setDator(reportData);
      console.log(reportData);
      // Cálculos individuales
      const totalCostoProductoPers =
        reportData.producto_personal?.reduce(
          (acc, item) => acc + parseFloat(item.total_costo || 0),
          0
        ) || 0;

      const totalCostoProductoServ =
        reportData.productos_servicio?.reduce(
          (acc, item) => acc + parseFloat(item.total_costo || 0),
          0
        ) || 0;

      const totalGasto =
        reportData.gasto?.reduce(
          (acc, item) => acc + parseFloat(item.total || 0),
          0
        ) || 0;
      // console.log(totalGasto)

      const totalCosto =
        reportData.lavado?.reduce(
          (acc, item) => acc + parseFloat(item.total_costo || 0),
          0
        ) || 0;

      const totalComision =
        reportData.lavado?.reduce(
          (acc, item) => acc + parseFloat(item.total_comision || 0),
          0
        ) || 0;

      const totalIngreso =
        reportData.lavado?.reduce(
          (acc, item) => acc + parseFloat(item.total_ingreso || 0),
          0
        ) || 0;

      const totalQrLavado = reportData.metodo_pago_lavado
        .filter((item) => item.metodo_pago === "qr")
        .reduce((acc, item) => acc + parseFloat(item.total_costo), 0);

      const totalEfectivoGasto = reportData.gasto
        .filter((item) => item.metodo_pago === "efectivo")
        .reduce((acc, item) => acc + parseFloat(item.total), 0);

      const totalDeuda = reportData.deuda
            .reduce((acc, item) => acc + parseFloat(item.total), 0);
      
      const totalPendienteLavado = reportData.metodo_pago_lavado
        .filter((item) => {
          return (
            item.metodo_pago === "pendiente" || item.metodo_pago === "credito"
          );
        })
        .reduce((acc, item) => {
          return acc + parseFloat(item.total_costo);
        }, 0);

     // console.log("Total Pendiente Lavado:", totalPendienteLavado);

      const totalQrProducto = reportData.metodo_pago_producto
        .filter((item) => item.metodo_pago === "qr")
        .reduce((acc, item) => acc + parseFloat(item.total_costo), 0);

      const totalEfectivoProducto = reportData.metodo_pago_producto
        .filter((item) => item.metodo_pago === "efectivo")
        .reduce((acc, item) => acc + parseFloat(item.total_costo), 0);

      const totalPendienteProducto = reportData.metodo_pago_producto
        .filter((item) => {
          return (
            item.metodo_pago === "pendiente" || item.metodo_pago === "credito"
          );
        })
        .reduce((acc, item) => {
          return acc + parseFloat(item.total_costo);
        }, 0);

      const totalPagadoProductoPersonal =
        reportData.productos_personal?.reduce((acc, item) => {
          if (item.estado === "Pagado") {
            return acc + parseFloat(item.total_costo || 0);
          }
          return acc;
        }, 0) || 0;

      // Cálculo de totales finales
      const totalQR = totalQrLavado + totalQrProducto;
      setQrFinal(totalQR);

      const totalPendiente =
        totalPendienteLavado + totalPendienteProducto;
     // console.log(totalPendiente + "pendiente");
      setPendiente(totalPendiente);

      

      // Establecer los totales en el estado
      setTotalCostoProductoPersonal(totalCostoProductoPers);
      setTotalCostoProductoServicio(totalCostoProductoServ);
      setTotalGasto(totalGasto);
      setDeuda(totalDeuda)
      setTotalGastoEfectivo(totalEfectivoGasto);
      setTotalCostoLavado(totalCosto);
      setTotalComisionLavado(totalComision);
      setTotalIngresoLavado(totalIngreso);
    }
  }, [reportData]);

  const handleDateForm = (data) => {
    setRuta(`getDataReport/${data.dateFrom}/${data.dateTo}`);
  };
  const handlePdfReport =(data)=>{
    const rutaPDF = `${import.meta.env.VITE_API_URL}getReporte/${data.dateFrom}/${data.dateTo}`;
    window.open(rutaPDF, "_blank");
  }

  return (
    <Container fluid className="principal-container">
      <Row className="mb-3">
        <DateRangeForm onDateForm={handleDateForm} withPdf ={true} onPdfForm={handlePdfReport}/>
      </Row>

      {reportCargando && <Loading />}
      {errorGet && <Errofield mensaje={errorGet.message} />}
      {/* Solo renderizar ListReportResumen si los datos están disponibles */}
      <Row>
        <Col md={4}>
          {/* Pasar el total calculado como prop */}
          {dator && dator.producto_personal.length > 0 && (
            <Row>
              <ListProductoPersonalReport
                producto_personal={dator.producto_personal}
                totalCosto={totalCostoProductoPersonal}
              />
            </Row>
          )}
          {dator && dator.productos_servicio.length > 0 && (
            <Row>
              <ListProductoServicioReport
                productos_servicio={dator.productos_servicio}
                totalCosto={totalCostoProductoServicio}
              />
            </Row>
          )}
          {dator && dator.gasto.length > 0 && (
            <Row>
              <ListGastoReport gastos={dator.gasto} totalGasto={totalGasto} />
            </Row>
          )}
          {dator && dator.deuda.length > 0 && (
            <Row>
             <ListDeudas deuda={dator.deuda} totalDeuda={deuda} />
            </Row>
          )}
        </Col>
        <Col md={8}>
          {dator && dator.lavado && (
            <Row>
              <ListReportResumen
                lavado={dator.lavado}
                totalCosto={totalCostoLavado}
                totalComision={totalComisionLavado}
                totalIngreso={totalIngresoLavado}
              />
            </Row>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Table variant="success" className="text-table">
            <thead>
              <tr>
                <td colSpan={2} className="text-center ">
                  {" "}
                  INGRESOS (I)
                </td>
              </tr>
              <tr>
                <th>Detalle</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lavado</td>
                <td>{totalCostoLavado.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Productos</td>
                <td>{totalCostoProductoServicio.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Productos Personal</td>
                <td>{totalCostoProductoPersonal.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Deudas</td>
                <td>{deuda.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{ingresos.toFixed(2)} Bs.</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table variant="danger" className="text-table">
            <thead>
              <tr>
                <td colSpan={2} className="text-center">
                  {" "}
                  EGRESOS (E)
                </td>
              </tr>
              <tr>
                <th>Detalle</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Comision</td>
                <td>{totalComisionLavado.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Gastos</td>
                <td>{totalGastoEfectivo.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Pendiente / Credito</td>
                <td>{pendiente.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{egresos.toFixed(2)} Bs.</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table variant="primary" className="text-table">
            <thead>
              <tr>
                <td colSpan={2} className="text-center">
                  {" "}
                  METODOS DE PAGO
                </td>
              </tr>
              <tr>
                <th>Detalle</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>QR</td>
                <td>{qrFinal.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>Total en Efectivo</td>
                <td>{efectivoFinal.toFixed(2)} Bs.</td>
              </tr>
              <tr>
                <td>I-E (Ingresos - Egresos)</td>
                <td>{(ingresos - egresos).toFixed(2)} Bs.</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Si no hay datos y no está cargando, mostrar mensaje */}
      {!reportCargando && !dator && <p>No hay datos disponibles</p>}
    </Container>
  );
};

export default HolderReports;
