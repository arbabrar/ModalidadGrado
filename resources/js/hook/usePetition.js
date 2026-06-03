import { useEffect, useState } from "react"
import axios from "axios"

const usePetition = (endpoint) =>{
    const [data, setData] = useState()
    const [error, setError]=useState()
    const [cargando, setCargando]= useState(false)
    const API_URL = import.meta.env.VITE_API_URL
    useEffect( () => {
        setCargando(true)
        
            axios.get(`${API_URL}${endpoint}`)
            .then(data=>{
                setData(data)
                setCargando(false)
            })
            .catch(e => {
                setError(e)
                setCargando(false)
            })
        
        
    }, [])
    return [data, cargando,error]
}

export default usePetition;