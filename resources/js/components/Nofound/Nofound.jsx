import { NavLink } from "react-router-dom";
const Nofound = () =>{
    return(
        <>
        <div className="container d-flex justify-content-center">
            <div className="card mt-5  w-75 text-center">
                <div className="card-header">
                    Error 404
                </div>
                <div className="card-body text-primary">
                    <h5 className="card-title">Opsssss!!!!</h5>
                    <p className="card-text">Al parecer no hemos encontrado la pagina solicitada.</p>
                    <NavLink to="/" className="btn btn-secondary">Volver al inicio</NavLink>
                    
                </div>
                
            </div>
        </div>
            
            
        </>
    )
}
export default Nofound