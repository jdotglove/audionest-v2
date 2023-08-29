import { useContext, useEffect, useState } from "react";
import { Container, Col, Nav, Navbar, Image } from "react-bootstrap";

import SpotifyContext from "../../contexts/SpotifyContext";
export default function SpotifyNavbar() {
  let [activeKey, setActiveKey] = useState("");
  const { user } = useContext(SpotifyContext);
  useEffect(() => {
    setActiveKey(
      window
        ? window.location.pathname.split("/")[2]
        : "recommendation-generator"
    );
  }, []);

  return (
    <Navbar
      style={{
        background: "#98611F",
      }}
      variant="light"
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
  );
}
