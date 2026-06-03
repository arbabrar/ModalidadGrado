import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const usePetitionPost = (ruta, data, autoStart = false) => {
  const [datos, setDatos] = useState(data);
  const [respuesta, setRespuesta] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(autoStart);

  const iniciarSolicitud = useCallback(() => {
    setStart(true);
  }, []);

  useEffect(() => {
    if (!start) return;

    const fetchData = async () => {
      setCargando(true);
      setError(null);
      try {
        const response = await api.post(ruta, datos);
        setRespuesta(response.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 422) {
            setError(err.response.data.errors);
          } else {
            setError({ message: err.message });
          }
        } else {
          setError({ message: "Ocurrió un error al enviar la solicitud" });
        }
      } finally {
        setCargando(false);
        setStart(false);
      }
    };

    fetchData();
  }, [start, ruta, datos]);

  return { respuesta, cargando, error, iniciarSolicitud, setDatos };
};

export default usePetitionPost;
