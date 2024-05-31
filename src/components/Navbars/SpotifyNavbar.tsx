import { Fragment, useContext, useEffect, useState } from "react";
import { Container, Offcanvas, Nav, Navbar, Image } from "react-bootstrap";

import FontProvider from "../../providers/FontProvider";
import SpotifyContext from "../../contexts/SpotifyContext";
export default function SpotifyNavbar() {
  let [activeKey, setActiveKey] = useState("");
  const { user } = useContext(SpotifyContext);
  const [show, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);
  useEffect(() => {
    setActiveKey(
      window
        ? window.location.pathname.split("/")[2]
        : "recommendation-generator"
    );
  }, []);

  return (
    <Fragment>
      <Navbar
        style={{
          background: "#98611F",
        }}
        variant="light"
        className="d-none d-lg-block"
      >
        {/* TODO: need to check into better routing flow */}
        {/* Might need to avoid nesting routes so deep and prefix them instead */}
        <Navbar.Brand className="mx-3" href="/">
          AudioNest
        </Navbar.Brand>
        <Nav variant="underline" activeKey={activeKey}>
          <Nav.Item>
            <Nav.Link
              href="recommendation-generator"
              eventKey="recommendation-generator"
            >
              Recommendation Generator
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="discovery" eventKey="discovery">
              Discovery
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="playlist-analysis" eventKey="playlist-analysis">
              Playlist Analysis
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="user-profile" eventKey="user-profile">
              User Profile
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Welcome, {user?.display_name}!
            {user?.images[0] && (
              <Image
                className="mx-2"
                src={user.images[0].url}
                height={30}
                width={30}
                roundedCircle
                alt="Profile Picture"
              />
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Navbar
        className="d-lg-none"
        style={{
          background: "#98611F",
        }}
        variant="light"
      >
        <Container fluid>
          <Navbar.Brand href="/">AudioNest</Navbar.Brand>
          <Navbar.Toggle className="d-block" onClick={handleShowOffCanvas} />
          <Offcanvas
            show={show}
            onHide={handleCloseOffCanvas}
            placement="end"
            style={{
              backgroundColor: "#98611F",
            }}
          >
            <FontProvider>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <Navbar.Brand className="text-black" href="/">
                    AudioNest
                  </Navbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="text-black">
                <Nav variant="underline" activeKey={activeKey}>
                  <Nav.Item>
                    <Nav.Link
                      href="recommendation-generator"
                      eventKey="recommendation-generator"
                    >
                      Recommendation Generator
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="discovery" eventKey="discovery">
                      Discovery
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="playlist-analysis"
                      eventKey="playlist-analysis"
                    >
                      Playlist Analysis
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="user-profile" eventKey="user-profile">
                      User Profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </FontProvider>
          </Offcanvas>
        </Container>
      </Navbar>
    </Fragment>
  );
}
