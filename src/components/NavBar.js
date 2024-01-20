import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/bia-logo.png"
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="60" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>
            <i className="fa-solid fa-house"></i>
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i>
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;