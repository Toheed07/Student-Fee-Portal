/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState } from "react";

import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [error, setError] = useState("");
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/sign-in");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      {currentUser ? (
        <div>
          {userRole === "admin" ? (
            <>
              <Navbar bg="light" expand="lg">
                <Container>
                  <Navbar.Brand href="/">KGR FP</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/notifications">Notifications</Nav.Link>
                      <Nav.Link href="/profile">Profile</Nav.Link>
                      <Nav.Link href="/departments">Departments</Nav.Link>
                      <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item href="">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                          Log Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>
          ) : (
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="/">KGR FP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/notifications">Notifications</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/">Receipts</Nav.Link>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                      <NavDropdown.Item href="">Settings</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          )}
        </div>
      ) : (
        <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="/">KGR FP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/notifications">Notifications</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/">Receipts</Nav.Link>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                      <NavDropdown.Item href="">Settings</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
      )}
    </>
  );
}

export default NavBar;
