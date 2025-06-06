import { Fragment } from "react";
import { Container, Nav, Navbar, Image } from "react-bootstrap";

import SpotifyContext from "../../contexts/SpotifyContext";

export default function SpotifyNavbar() {
  return (
    <Fragment>
      <Navbar
        className="mx-0 bg-primary text-text"
        variant="light"
      >
        <Container fluid>
          {/* TODO: need to check into better routing flow */}
          {/* Might need to avoid nesting routes so deep and prefix them instead */}
          <Navbar.Brand href="/" className="text-text">AudioNest</Navbar.Brand>
        </Container>
      </Navbar>
    </Fragment>
  );
}
