import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function TSNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Text-Summarization</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="HuggingFace" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="https://huggingface.co/docs/api-inference/quicktour">API Quick Tour</NavDropdown.Item>
              <NavDropdown.Item href="https://huggingface.co/docs/api-inference/detailed_parameters?code=python#summarization-task">
              Summarization API
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://huggingface.co">HuggingFace</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link eventKey={2} href="/signup"> Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TSNavbar;