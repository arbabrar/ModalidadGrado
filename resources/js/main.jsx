import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import './main.css';
import App from './components/App/App.jsx'
import Login from './components/Login/Login.jsx';
import Nofound from './components/Nofound/Nofound.jsx';
import Inicio from './components/Inicio/Inicio.jsx';
import { UserContextProvider } from './context/UserContext.jsx';
import Welcome from './components/Welcome/Welcome.jsx';
import FormRegVehiculo from './components/Forms/FormRegVehiculo.jsx';
import FormProductosReg from './components/Forms/FormProductosReg.jsx';
import FormRegistroServicio from './components/Forms/FormRegistroServicio.jsx';
import FormRegistroPago from './components/Forms/FormRegistroPago.jsx';
import FormEditarServicio from './components/Forms/FormEditarServicio.jsx';
import HolderEditarPersonal from './components/Holder/HolderEditarPersonal.jsx';
import HolderListaPersonal from './components/Holder/HolderListaPersonal.jsx';
import HolderListaVehiculo from './components/Holder/HolderListaVehiculo.jsx';
import HolderListarServicio from './components/Holder/HolderListarServicio.jsx';
import HolderRegistroPersonal from './components/Holder/HolderRegistroPersonal.jsx';
import HolderEditarProducto from './components/Holder/HolderEditarProducto.jsx';
import HolderProductoPersonal from './components/Holder/HolderProductoPersonal.jsx';
import HolderListaProducto from './components/Holder/HolderListaProducto.jsx';
import FormPagoPersonal from './components/Forms/FormPagoPersonal.jsx';
import HolderRegistroGasto from './components/Holder/HolderRegistroGasto.jsx';
import HolderListGasto from './components/Holder/HolderListGasto.jsx';
import HolderEditarGasto from './components/Holder/HolderEditarGasto.jsx';
import HolderReports from './components/Holder/HolderReports.jsx';
import HolderRegistroDeuda from './components/Holder/HolderRegistroDeuda.jsx';
import FormregistroCliente from './components/Forms/FormregistroCliente.jsx';
import FormAsociarClienteVehiculo from './components/Forms/FormAsociarClienteVehiculo.jsx';
import HolderListaCliente from './components/Holder/HolderListaCliente.jsx';
import HolderRegistroVehiculo from './components/Holder/HolderRegistroVehiculo.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<App/>}>
            <Route index element={<Welcome/>}/>
            <Route path='registroPersonal' element={<HolderRegistroPersonal/>}/>
            <Route path='registroCliente' element={<FormregistroCliente/>}/>
            <Route path='listaPersonal' element={<HolderListaPersonal/>}/>
            <Route path='editarPersonal/:id' element={<HolderEditarPersonal/>}/>
            <Route path='registroVehiculo' element={<HolderRegistroVehiculo/>}/>
            <Route path='listaVehiculo' element={<HolderListaVehiculo />}/>
            <Route path='registroProducto' element={<FormProductosReg/>}/>
            <Route path='listaProducto' element={<HolderListaProducto/>}/>
            <Route path='editarProducto/:id' element={<HolderEditarProducto/>}/>
            <Route path='registrarServicio' element={<FormRegistroServicio/>}/>
            <Route path='listarServicio' element={<HolderListarServicio/>}/>
            <Route path='pagarServicio/:id' element={<FormRegistroPago/>}/>
            <Route path='editarServicio/:id' element={<FormEditarServicio/>}/>
            <Route path='setProductoPersonal/:id' element={<HolderProductoPersonal />}/>
            <Route path='getDataPagoPersonal/:id' element={<FormPagoPersonal />}/>
            <Route path='registroGasto' element={<HolderRegistroGasto />}/>
            <Route path='ListaGasto' element={<HolderListGasto/>} />
            <Route path='editarGasto/:id' element={<HolderEditarGasto />}/>
            <Route path='registroDeuda' element={<HolderRegistroDeuda />}/>
            <Route path='reports' element={<HolderReports />}/>
            <Route path='VehiculosCliente/:clase/:id' element= {<FormAsociarClienteVehiculo/>}/>
            <Route path='verCliente/:clase' element={<HolderListaCliente />}/>
          </Route>
          <Route path = '/home' element = {<Inicio/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='*' element={<Nofound/>}/>
        </Routes>
    </BrowserRouter>
  </UserContextProvider>

)
