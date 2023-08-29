import { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import FontProvider from '../../providers/FontProvider';

export default function MainNavbar() {
  const [show, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);
  return (
    <div>
      <Navbar className="d-none d-lg-block" style={{
        background: '#98611F',
      }} variant="light">
        <Container fluid>
          <Navbar.Brand style={{
            fontSize: 'xx-large',
          }} href="/">AudioNest</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/integration-hub">Integration Hub</Nav.Link>
            <Nav.Link href="/resume">Résumé</Nav.Link>
            <Nav.Link href="/about-me">About Me</Nav.Link>
            <Nav.Link href="/contact">Contact/Links</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar className="d-lg-none" style={{
        background: '#98611F',
      }} variant="light">
        <Container fluid>
          <Navbar.Brand href="/">AudioNest</Navbar.Brand>
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
                  <Navbar.Brand className="text-black"
                    href="/"
                  >AudioNest</Navbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end pe-3 me-auto">
                  <Nav.Link className="text-black" href="/integration-hub">Integration Hub</Nav.Link>
                  <Nav.Link className="text-black" href="/resume">Résumé</Nav.Link>
                  <Nav.Link className="text-black" href="/about-me">About Me</Nav.Link>
                  <Nav.Link className="text-black" href="/contact">Contact/Links</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </FontProvider>
          </Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
