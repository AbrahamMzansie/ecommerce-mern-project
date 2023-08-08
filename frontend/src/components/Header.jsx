import React from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import logo from "../assets/logo.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart); 
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="company logo" />
              Mzansie Shopping
            </Navbar.Brand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                 Cart 
                 {cartItems.length > 0 && (                  
                  <Badge pill bg="success" variant="primary" className="ms-2">
                    {cartItems.reduce((ac , c) => ac + c.qty , 0)}
                  </Badge>
                 )}
                  
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
