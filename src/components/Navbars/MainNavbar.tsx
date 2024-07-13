import { useState, Fragment } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import FontProvider from '../../providers/FontProvider';

export default function MainNavbar() {
  const [show, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);
  return (
    <Fragment>
      <Navbar className="d-none d-lg-block" style={{
        background: '#98611F',
        color: "#FFFFFF"
      }} variant="light">
        <Container fluid>
          <Navbar.Brand style={{
            fontSize: 'xx-large',

            color: "#FFFFFF"
          }} href="/">AudioNest</Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Link style={{
            color: "#FFFFFF"
          }} href="/integrations">Integrations</Nav.Link>
            <Nav.Link style={{
            color: "#FFFFFF"
          }} href="/resume">Résumé</Nav.Link>
            <Nav.Link style={{
            color: "#FFFFFF"
          }} href="/about-me">About Me</Nav.Link>
            <Nav.Link style={{
            color: "#FFFFFF"
          }} href="/contact">Contact/Links</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar className="d-lg-none" style={{
        background: '#98611F',
      }} variant="light">
        <Container fluid>
          <Navbar.Brand style={{
            color: "#FFFFFF"
          }} href="/">AudioNest</Navbar.Brand>
          <Navbar.Toggle className="d-block" onClick={handleShowOffCanvas} />
          <Offcanvas
            show={show} onHide={handleCloseOffCanvas}
            placement="end"
            style={{
              backgroundColor: '#98611F',
            }}
          >
            <FontProvider>
              <Offcanvas.Header  closeButton>
                <Offcanvas.Title>
                  <Navbar.Brand className="text-white"
                    href="/"
                  >AudioNest</Navbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end pe-3 me-auto">
                  <Nav.Link className="text-white" href="/integrations">Integrations</Nav.Link>
                  <Nav.Link className="text-white" href="/resume">Résumé</Nav.Link>
                  <Nav.Link className="text-white" href="/about-me">About Me</Nav.Link>
                  <Nav.Link className="text-white" href="/contact">Contact/Links</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </FontProvider>
          </Offcanvas>
        </Container>
      </Navbar>
    </Fragment>
  );
}
