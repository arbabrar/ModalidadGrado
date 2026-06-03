import { createContext, useContext, useReducer } from "react";

const EditarServicioContext = createContext();

export const useEditarServicioContext = () => {
    return useContext(EditarServicioContext);
}

const initialState = {
    serviciosOriginal: [],      // Siempre inmutable
    productosOriginal: [],      // Siempre inmutable
    serviciosDisponibles: [],   // Servicios disponibles para manipular
    productosDisponibles: [],   // Productos disponibles para manipular
    serviciosCancelable: [],    // Servicios que se pueden cancelar
    productosCancelable: [],    // Productos que se pueden cancelar
    serviciosNuevos: [],        // Servicios nuevos que se agregan
    productosNuevos: [],        // Productos nuevos que se agregan
    wasEdit: false              // Indica si se han realizado cambios
};

const reducer = (state, action) => {
    switch (action.type) {
        // Establece los servicios originales y los disponibles al mismo tiempo
        case 'SET_SERVICIOS_ORIGINALES': {
            return {
                ...state,
                serviciosOriginal: action.data,
                serviciosDisponibles: action.data, // Inicialmente los disponibles son iguales a los originales
            };
        }

        // Establece los productos originales y los disponibles al mismo tiempo
        case 'SET_PRODUCTOS_ORIGINALES': {
            return {
                ...state,
                productosOriginal: action.data,
                productosDisponibles: action.data, // Inicialmente los disponibles son iguales a los originales
            };
        }

        // Agrega un nuevo servicio sin afectar los disponibles
        case 'ADD_SERVICIO_NUEVO': {
            return {
                ...state,
                serviciosNuevos: [...state.serviciosNuevos, action.data], // Los servicios nuevos están separados
                wasEdit: true
            };
        }

        // Agrega un nuevo producto sin afectar los disponibles
        case 'ADD_PRODUCTO_NUEVO': {
            return {
                ...state,
                productosNuevos: [...state.productosNuevos, action.data], // Los productos nuevos están separados
                wasEdit: true
            };
        }

        // Remueve un servicio nuevo sin afectar los disponibles
        case 'REMOVE_SERVICIO_NUEVO': {
            return {
                ...state,
                serviciosNuevos: state.serviciosNuevos.filter(servicio => servicio.id !== action.data.id), // Remueve solo de los nuevos
                wasEdit: true
            };
        }

        // Remueve un producto nuevo sin afectar los disponibles
        case 'REMOVE_PRODUCTO_NUEVO': {
            return {
                ...state,
                productosNuevos: state.productosNuevos.filter(producto => producto.id !== action.data.id), // Remueve solo de los nuevos
                wasEdit: true
            };
        }

        // Elimina los servicios cancelables y los devuelve a los disponibles
        case 'REMOVE_SERVICIOS_CANCELABLES': {
            const serviciosRestantesCancelable = state.serviciosCancelable.filter(
                servicio => servicio.id !== action.data.id // Filtrar los que NO son eliminados
            );
        
            const servicioRestaurado = state.serviciosCancelable.find(servicio => servicio.id === action.data.id);
        
            return {
                ...state,
                serviciosDisponibles: [...state.serviciosDisponibles, servicioRestaurado], // Restaurar el cancelado a los disponibles
                serviciosCancelable: serviciosRestantesCancelable, // Mantener los restantes cancelables
                wasEdit: true
            };
        }

        // Elimina los productos cancelables y los devuelve a los disponibles
        case 'REMOVE_PRODUCTOS_CANCELABLES': {
            const productosRestantesCancelable = state.productosCancelable.filter(
                producto => producto.id !== action.data.id // Filtrar los que NO son eliminados
            );
        
            const productoRestaurado = state.productosCancelable.find(producto => producto.id === action.data.id);
        
            return {
                ...state,
                productosDisponibles: [...state.productosDisponibles, productoRestaurado], // Restaurar el cancelado a los disponibles
                productosCancelable: productosRestantesCancelable, // Mantener los restantes cancelables
                wasEdit: true
            };
        }

        // Establece los servicios cancelables y elimina los servicios cancelados de los disponibles
        case 'SET_SERVICIOS_CANCELABLES': {
            const serviciosRestantes = state.serviciosDisponibles.filter(
                servicio => servicio.id !== action.data.id // Comparación directa con un solo objeto
            );
        
            return {
                ...state,
                serviciosCancelable: [...state.serviciosCancelable, action.data], // Agregar el cancelado a la lista de cancelables
                serviciosDisponibles: serviciosRestantes, // Eliminar el cancelado de los disponibles
                wasEdit: true
            };
        }

        // Establece los productos cancelables y elimina los productos cancelados de los disponibles
        case 'SET_PRODUCTOS_CANCELABLES': {
            const productosRestantes = state.productosDisponibles.filter(
                producto => producto.id !== action.data.id
            );

            return {
                ...state,
                productosCancelable: [...state.productosCancelable, action.data],      // Guardar los cancelables
                productosDisponibles: productosRestantes, // Eliminar los cancelados de los disponibles
                wasEdit: true
            };
        }

        // Resetea los cambios y restaura los datos originales
        case 'RESET_EDITS': {
            return {
                ...state,
                wasEdit: false,
                serviciosCancelable: [],
                productosCancelable: [],
                serviciosDisponibles: [...state.serviciosOriginal], // Restaurar los disponibles a los originales
                productosDisponibles: [...state.productosOriginal]  // Restaurar los disponibles a los originales
            };
        }

        default:
            return state;
    }
};


export const EditarServicioProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <EditarServicioContext.Provider value={{ state, dispatch }}>
            {children}
        </EditarServicioContext.Provider>
    );
}
