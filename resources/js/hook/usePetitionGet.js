import { useEffect, useState } from "react";
import api from "../services/api";

const usePetitionGet = ({ ruta, islogged = true }) => {
  const [dato, setDato] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      setError(null);
      try {
        const config = islogged ? {} : { headers: { Authorization: null } };
        const response = await api.get(ruta, config);
        setDato(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [ruta, islogged]);

  return { dato, cargando, error };
};

export default usePetitionGet;
