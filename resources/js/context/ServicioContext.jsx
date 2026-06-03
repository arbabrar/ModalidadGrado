import { createContext, useContext, useReducer } from "react";

const ServicioContext = createContext();

export const useServicioContext = () => {
    return useContext(ServicioContext);
};

const initialState = {
    vehiculo: null,
    personal: null,
    cliente: null,
    servicio: [],
    hasvehiculo: false,
    haspersonal: false,
    hasServicios: false,
    hasCliente: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'DATA_VEHICULO': {
            return { ...state, vehiculo: { ...action.data } };
        }
        case 'DATA_PERSONAL': {
            return { ...state, personal: { ...action.data } };
        }
        case 'DATA_CLIENTE': {
            return { ...state, cliente: { ...action.data } };
        }
        case 'DATA_ADD_SERVICIOS': {
            const exists = state.servicio?.some(servicio => servicio.id === action.data.id);
            if (exists) return state;
            return { ...state, servicio: [...(state.servicio || []), action.data] };
        }
        case 'DATA_REMOVE_SERVICIO': {
            return { ...state, servicio: state.servicio.filter(item => item.id !== action.data.id) };
        }
        case 'DATA_REMOVE_VEHICULO': {
            return { ...state, vehiculo: null };
        }
        case 'DATA_REMOVE_PERSONAL': {
            return { ...state, personal: null };
        }
        case 'DATA_REMOVE_CLIENTE': {
            return { ...state, cliente: null };
        }
        case 'DATA_HAS_VEHICULO': {
            return { ...state, hasvehiculo: { ...action.data, value: action.data?.value ?? false } };
        }
        case 'DATA_HAS_PERSONAL': {
            return { ...state, haspersonal: { ...action.data, value: action.data?.value ?? false } };
        }
        case 'DATA_HAS_CLIENTE': {
            return { ...state, hasCliente: { ...action.data, value: action.data?.value ?? false } };
        }
        case 'DATA_HAS_SERVICIOS': {
            const hasServicios = state.servicio && state.servicio.length > 0;
            return { ...state, hasServicios };
        }
        default:
            return state;
    }
};

export const ServicioProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ServicioContext.Provider value={{ state, dispatch }}>
            {children}
        </ServicioContext.Provider>
    );
};
