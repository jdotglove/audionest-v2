import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Row, Col } from "react-bootstrap";

import MainNavbar from "../src/components/Navbars/MainNavbar";
import SpotifyContext from "../src/contexts/SpotifyContext";
import styles from "../styles/Integrations.module.css";
import { authenticateSpotify } from "../src/middleware/spotify";


export default function Integrations() {
  const { isLoggedIn } = useContext(SpotifyContext);
  const { push } = useRouter();
  const authenticateSpotifyUser = async () => {
    sessionStorage.clear();
    await authenticateSpotify();
  };

  return (
    <div className={styles.container}>
      <MainNavbar />
      <SpotifyContext.Consumer>
        {({ isLoggedIn }) =>
          !isLoggedIn ? (
            <Container>
              <Row className="py-2">
                <Col>
                  <h1>
                    Virtual <span style={{ color: "#98611F" }}>Spotify</span> Crate Digger
                  </h1>
                </Col>
              </Row>
              <Row className="py-2" md={3}>
                <Col>
                  <div className="d-grid gap-2">
                    <Button
                      size="lg"
                      style={{ backgroundColor: "#98611F", borderColor: "#98611F" }}
                      onClick={async () => {
                        await authenticateSpotifyUser();
                      }}
                    >
                      Login
                    </Button>
                  </div>
                </Col>
              </Row>
              {/* <Row className="py-2">
                <Col>
                  <h1>
                    <span style={{ color: "#98611F" }}>Sound</span>scape
                  </h1>
                </Col>
              </Row>
              <Row className="py-2" md={3}>
                <Col>
                  <div className="d-grid gap-2">
                    <Button
                      size="lg"
                      href="soundscape"
                    >
                      Enter
                    </Button>
                  </div>
                </Col>
              </Row> */}
            </Container>
          ) : (
            <Container>
              <Row>
                <Col
                  className="pa-0"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "15dvh",
                  }}
                >
                  <h1> Successfully Logged In </h1>
                </Col>
              </Row>
            </Container>
          )
        }
      </SpotifyContext.Consumer>
    </div>
  );
}
