import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/">Photo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/">
                <Button variant="primary">Home</Button>
              </Link>
            </Nav.Item>
            {this.props.loggedIn ? (
              <Nav.Item>
                <Link to="/profile">
                  <Button variant="secondary">Profile</Button>
                </Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Link to="/login">
                  <Button variant="btn btn-outline-success">Login</Button>
                </Link>
              </Nav.Item>
            )}

            {this.props.loggedIn ? (
              <Nav.Item>
                <Button
                  variant="outline-primary"
                  onClick={() => this.props.logout()}
                >
                  Logout
                </Button>
              </Nav.Item>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
/*
(
              <Nav.Item>
                <Link to="/register">
                  <Button variant="outline-primary">Register</Button>
                </Link>
              </Nav.Item>
            )
*/
