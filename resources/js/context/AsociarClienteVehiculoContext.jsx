// React Context for Vehicle Management
import React, { createContext, useReducer, useContext } from 'react';

const AsociarClienteVehiculoContext = createContext();

export const useAsociarClienteVehiculoContext = () => {
    return useContext(AsociarClienteVehiculoContext);
};

// Initial State
const initialState = {
    vehiculosOriginales: [],
    vehiculosAsociados: [],
    vehiculosDesasociados: [],
    vehiculosParaDesasociar: [],
    vehiculosReasociar: [],
    vehiculosNuevos: [],
    wasEdit: false,
};

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'CARGAR_VEHICULOS':
            return {
                ...state,
                vehiculosOriginales: action.data,
                vehiculosAsociados: action.data.filter(
                    (vehiculo) => vehiculo.estado === 1
                ),
                vehiculosDesasociados: action.data.filter(
                    (vehiculo) => vehiculo.estado === 2
                ),
                wasEdit: false,
            };

        case 'ASOCIAR_NUEVO_VEHICULO':
            if (
                state.vehiculosAsociados.some((vehiculo) => vehiculo.placa === action.data.placa) ||
                state.vehiculosNuevos.some((vehiculo) => vehiculo.placa === action.data.placa) ||
                state.vehiculosDesasociados.some((vehiculo) => vehiculo.placa === action.data.placa) ||
                state.vehiculosParaDesasociar.some((vehiculo) => vehiculo.placa === action.data.placa) ||
                state.vehiculosReasociar.some((vehiculo) => vehiculo.placa === action.data.placa)   
            ) {
                return state; // No agregar si ya existe
            }
            return {
                ...state,
                vehiculosNuevos: [...state.vehiculosNuevos, action.data],
                vehiculosDesasociados: state.vehiculosDesasociados.filter(
                    (vehiculo) => vehiculo.placa !== action.data.placa
                ),
                wasEdit: true,
            };

        case 'DESASOCIAR_VEHICULO':
            if (
                state.vehiculosParaDesasociar.some((vehiculo) => vehiculo.placa === action.data.placa)
            ) {
                return state; // No agregar si ya existe en desasociados
            }
            return {
                ...state,
                vehiculosParaDesasociar: [...state.vehiculosParaDesasociar, action.data],
                vehiculosAsociados: state.vehiculosAsociados.filter(
                    (vehiculo) => vehiculo.placa !== action.data.placa
                ),
                wasEdit: true,
            };

        case 'REASOCIAR_VEHICULO':
            if (
                state.vehiculosAsociados.some((vehiculo) => vehiculo.placa === action.data.placa)
            ) {
                return state; // No agregar si ya existe en asociados
            }
            return {
                ...state,
                vehiculosReasociar: [...state.vehiculosReasociar, action.data],
                vehiculosDesasociados: state.vehiculosDesasociados.filter(
                    (vehiculo) => vehiculo.placa !== action.data.placa
                ),
                wasEdit: true,
            };

        case 'QUITAR_NUEVO':
            return {
                ...state,
                vehiculosNuevos: state.vehiculosNuevos.filter(
                    (vehiculo) => vehiculo.placa !== action.data.placa
                ),
                wasEdit: true,
            };

        case 'LIMPIAR_ESTADO':
            return {
                ...state,
                wasEdit: false,
                vehiculosDesasociados: [...state.vehiculosOriginales.filter((v) => v.estado === 2)],
                vehiculosNuevos: [],
                vehiculosAsociados: [...state.vehiculosOriginales.filter((v) => v.estado === 1)],
                vehiculosParaDesasociasar: [],
                vehiculosReasociar: [],
                
            };
        case 'RESTAURAR_ASOCIADO':
            if (
                state.vehiculosAsociados.some((vehiculo) => vehiculo.placa === action.data.placa)
            ) {
                return state; // No agregar si ya existe en desasociados
            }
            return {
                ...state,
                vehiculosAsociados: [...state.vehiculosAsociados, action.data],
                vehiculosParaDesasociar: state.vehiculosParaDesasociar.filter(
                    (vehiculo) => vehiculo.placa !== action.data.placa
                ),
                wasEdit: true,
            };
        case 'RESTAURAR_DEASOCIADOS':
            if (
                state.vehiculosDesasociados.some((vehiculo) => vehiculo.placa === action.data.placa)
            ) {
                return state; // No agregar si ya existe en desasociados
            }
            return {
                ...state,
                vehiculosDesasociados: [...state.vehiculosDesasociados, action.data],
                vehiculosReasociar: state.vehiculosReasociar.filter(
                    (vehiculo) => vehiculo.placa !== action.data.placa
                ),
                wasEdit: true,
            };
        

        default:
            return state;
    }
};


// Provider Component
export const AsociarClienteVehiculoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AsociarClienteVehiculoContext.Provider value={{ state, dispatch }}>
            {children}
        </AsociarClienteVehiculoContext.Provider>
    );
};
