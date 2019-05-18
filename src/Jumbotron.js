import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";

export const Jumbotron = () => (
  <Jumbo fluid className="jumbo">
    <div />
    <Container>
      <h1>Welcome</h1>
      <p>Learn to code from my YouTube videos</p>
    </Container>
  </Jumbo>
);
