import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AlertEmpty = ({ valor = "info", mensaje, colNum, onButtonClick }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td colSpan={colNum}>
        <Alert
          key={valor}
          variant={valor}
          className="d-flex justify-content-between"
        >
          <span>{mensaje}</span> {/* Texto del mensaje */}
          <Button
            variant="primary"
            onClick={() => onButtonClick(true)}
            className="ms-auto me-0"
          >
            Registrar
          </Button>
        </Alert>
      </td>
    </tr>
  );
};
export default AlertEmpty;
