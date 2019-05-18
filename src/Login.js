import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const initialState = {
  email: "",
  password: ""
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = initialState;
  }

  componentWillMount() {
    if (this.props.loggedin) this.props.history.replace("/");
  }

  validate = () => {
    if (this.state.email.trim() === "" || this.state.password.trim() === "") {
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.props.login(this.state.email, this.state.password, this.props);
      this.setState(initialState);
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
    return (
      <Row className="justify-content-md-center">
        <Col lg="4">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address or Username</Form.Label>
              <Form.Control
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                //type="email"
                placeholder="Enter email address or Username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Remember me" />
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
              Doesn't have an account?&nbsp;&nbsp;
              <Button
                variant="btn btn-outline-success"
                onClick={() => this.props.history.push("/accounts/register")}
              >
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}
