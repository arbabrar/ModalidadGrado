import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        try {
            const stored = localStorage.getItem("appCredential");
            if (stored) setUsuario(JSON.parse(stored));
        } catch {
            localStorage.removeItem("appCredential");
        }
    },[])

    return(
        <UserContext.Provider value={{usuario,setUsuario}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }
