import { useEffect, useState } from "react";
import { Container, Form, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useAppSelector } from "../hooks/hooks";

const Header = () => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Link to={"/"} className="navbar-brand">
          Redux Saga
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form.Check
            defaultChecked={mode === "light" ? false : true}
            onChange={(e) => {
              setMode(e.target.checked === true ? "dark" : "light");
            }}
            type="switch"
            id="custom-switch"
            label={
              mode === "light" ? (
                <Navbar.Text>Light mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark mode</Navbar.Text>
              )
            }
          />
        </Navbar.Collapse>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavDropdown title="Settings">
          <NavLink to={"/user"} className="dropdown-item">
            User Page
          </NavLink>
          <NavDropdown.Divider />
          <NavLink to={"/login"} className="dropdown-item">
            Login
          </NavLink>

          <NavDropdown.Item href="#">Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
