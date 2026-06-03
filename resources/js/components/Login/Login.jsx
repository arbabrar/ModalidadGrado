import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Form, Container, Image } from "react-bootstrap";
import "./Login.css";
import SubmitBtn from "../Utilidades/Btn/SubmitBtn/SubmitBtn";
import { useNavigate } from "react-router-dom";
import Errofield from "../Utilidades/Errorfield/Errorfield";
import usePetitionPost from "../../hook/usePetitionPost";
import Loading from "../Utilidades/Loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { respuesta, cargando, error, iniciarSolicitud, setDatos } = usePetitionPost('auth/login', inputData, false);

  const handSubmit = data => {
    setDatos(data);
    iniciarSolicitud();
  }

  useEffect(() => {
    if (respuesta) {
      // Guardar token y usuario en localStorage
      localStorage.setItem("tokenLavBacarreza", respuesta.token);
      const usuario = respuesta.user || {};
      localStorage.setItem("appCredential", JSON.stringify(usuario));
      navigate("/");
    }
  }, [respuesta, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card border="primary" style={{ width: '75%' }} className="card-form">
        <Card.Body className="text-primary d-flex flex-column align-items-center">
          <Image 
            src="/imagenes/logo.png"  // Cambia esta línea
            alt="Logo" 
            fluid
            className="mb-4" 
            style={{ width: '200px', height: 'auto' }} 
          />
         
          <Form onSubmit={handleSubmit(handSubmit)} id="login" className="w-100">
            <div className="mb-3">
              <label htmlFor="email" className="text-info">Correo Electrónico</label>
              <input
                {...register("email", {
                  required: "El correo electrónico es obligatorio.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "El correo electrónico es inválido."
                  }
                })}
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
              />
              {errors?.email && <Errofield mensaje={errors?.email?.message} />}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-info">Contraseña</label>
              <input
                {...register("password", {
                  required: "La contraseña es obligatoria.",
                  minLength: {
                    value: 5,
                    message: "La contraseña debe tener más de 5 caracteres."
                  },
                  maxLength: {
                    value: 15,
                    message: "La contraseña no debe exceder los 15 caracteres."
                  }
                })}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="***********"
              />
              {errors?.password && <Errofield mensaje={errors?.password?.message} />}
            </div>
            {cargando && <Loading />}
            {!cargando && (
              <SubmitBtn type="submit" clase="btn btn-primary w-100" valor={cargando ? "Espere por favor ..." : "Ingresar"} />
            )}
          </Form>
          {error && <Errofield mensaje={error.message} />}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
