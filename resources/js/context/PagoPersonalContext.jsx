import { createContext, useContext, useReducer } from "react";

const PagoPersonalContext = createContext();

export const usePagoPersonalContext = () => {
  return useContext(PagoPersonalContext);
};

const initialState = {
  serviciosPagoOriginal: [],
  productosPagoOriginal: [],
  serviciosPendiente: [],
  productosPendiente: [],
  serviciosNopago: [],
  productosNopago: [],
  wasEdit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    // Establece los servicios originales y los marca como pendientes
    case 'SET_SERVICIOS_PAGO_ORIGINAL': {
      return {
        ...state,
        serviciosPagoOriginal: action.data,
        serviciosPendiente: action.data,
      };
    }

    // Establece los productos originales y los marca como pendientes
    case 'SET_PRODUCTOS_PAGO_ORIGINAL': {
      return {
        ...state,
        productosPagoOriginal: action.data,
        productosPendiente: action.data,
      };
    }

    // Elimina un servicio de los pendientes y lo añade a los servicios sin pago (cancelado)
    case 'REMOVE_SERVICIO_PAGO_CANCELABLE': {
      const servicioPendiente = state.serviciosPendiente.filter(
        servicio => servicio.id !== action.data.id
      );
      return {
        ...state,
        serviciosPendiente: servicioPendiente,
        serviciosNopago: [...state.serviciosNopago, action.data],
        wasEdit: true,
      };
    }

    // Elimina un producto de los pendientes y lo añade a los productos sin pago (cancelado)
    case 'REMOVE_PRODUCTO_PAGO_CANCELABLE': {
      const productoPendiente = state.productosPendiente.filter(
        producto => producto.id !== action.data.id
      );
      return {
        ...state,
        productosPendiente: productoPendiente,
        productosNopago: [...state.productosNopago, action.data],
        wasEdit: true,
      };
    }

    // Restaura un servicio cancelado a los servicios pendientes
    case 'RESTORE_SERVICIO_PENDIENTE': {
      const servicioCancelado = state.serviciosNopago.filter(
        servicio => servicio.id !== action.data.id
      );
      return {
        ...state,
        serviciosPendiente: [...state.serviciosPendiente, action.data], // Añadir el servicio restaurado
        serviciosNopago: servicioCancelado, // Quitarlo de los cancelados
        wasEdit: true,
      };
    }

    // Restaura un producto cancelado a los productos pendientes
    case 'RESTORE_PRODUCTO_PENDIENTE': {
      const productoCancelado = state.productosNopago.filter(
        producto => producto.id !== action.data.id
      );
      return {
        ...state,
        productosPendiente: [...state.productosPendiente, action.data], // Añadir el producto restaurado
        productosNopago: productoCancelado, // Quitarlo de los cancelados
        wasEdit: true,
      };
    }

    // Restaura todos los servicios a sus pendientes originales
    case 'RESET_SERVICIOS_PENDIENTE': {
      return {
        ...state,
        serviciosPendiente: [...state.serviciosPagoOriginal],
        serviciosNopago: [],
        wasEdit: true,
      };
    }

    // Restaura todos los productos a sus pendientes originales
    case 'RESET_PRODUCTOS_PENDIENTE': {
      return {
        ...state,
        productosPendiente: [...state.productosPagoOriginal],
        productosNopago: [],
        wasEdit: true,
      };
      
    }
    case 'RESET' :{
        return {
            ...state,
            wasEdit: false,
            productosNopago: [],
            serviciosNopago: [],
            serviciosPendiente: [...state.serviciosPagoOriginal],
            productosPendiente: [...state.productosPagoOriginal],
        };

      }

    default:
      return state;
  }
};

export const PagoPersonalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PagoPersonalContext.Provider value={{ state, dispatch }}>
      {children}
    </PagoPersonalContext.Provider>
  );
};
