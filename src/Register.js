import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const initialState = {
  email: "",
  name: "",
  username: "",
  password: ""
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = initialState;
  }

  validate = () => {
    if (
      this.state.email.trim() === "" ||
      this.state.name.trim() === "" ||
      this.state.username.trim() === "" ||
      this.state.password.trim() === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.props.signup(
        this.state.email,
        this.state.name,
        this.state.username,
        this.state.password,
        this.props
      );

      //this.setState(initialState);
    }
  };

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  render() {
    const returnValue = this.props.loggedin ? (
      <Redirect to="/" />
    ) : (
      <Row className="justify-content-md-center">
        <Col lg="4">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                placeholder="Enter Full Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Enter Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div
              style={{
                float: "right",
                display: "inline-block",
                fontSize: "9pt"
              }}
            >
              Have an account?&nbsp;&nbsp;
              <Button
                variant="btn btn-outline-success"
                onClick={() => this.props.history.push("/accounts/login")}
              >
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );

    return returnValue;
  }
}

export default Register;
