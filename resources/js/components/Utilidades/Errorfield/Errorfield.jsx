import "./Errorfield.css"
const Errofield = ({mensaje}) => {
    return (
        <span className="error">
            {mensaje}
        </span>
    )
}
export default Errofield;