import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../../context/UserContext";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdLocalCarWash } from "react-icons/md";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import BusIcon from "../Icons/BusIcon";
const Menu = () => {
  const { usuario } = useContext(UserContext);

  const navigation = useNavigate();

  return (
    <Navbar
      expand="lg"
      bg="danger"
      data-bs-theme="dark"
      fixed="top"
      className="d-flex"
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            alt=""
            src="/imagenes/logo.png"
            width="80"
           
            className="d-inline-block align-top"
          />
         
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className=" ms-auto" activeKey="/" navbarScroll>
            <Nav.Item>
              <Nav.Link href="/">
                {" "}
                <BsFillMenuButtonWideFill /> Inicio
              </Nav.Link>
            </Nav.Item>

            <NavDropdown title={usuario.name} id="collapsible-nav-dropdown">
              <NavDropdown.Item>{usuario.email}</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("tokenLavBacarreza");
                  navigation("/login");
                }}
              >
                Salir
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Menu;
