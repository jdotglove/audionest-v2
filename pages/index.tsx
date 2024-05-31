import { Button, Col, Container, Row } from 'react-bootstrap';

import MainNavbar from '../src/components/Navbars/MainNavbar';
export default function Home() {

  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="pt-3">
          <Col>
              <h1 style={{
                fontSize: 'xxx-large',
                fontWeight: 800,
              }}>
                Welcome!!
              </h1>
              <p style={{
                fontSize: 'x-large',
                fontWeight: 400,
              }}>
                A place I made to explore music, there will be more to come but for now might as well check out what&apos;s here
              </p>
            </Col>
        </Row>
        <Row style={{
          fontSize: 'x-large',
          fontWeight: 400,
        }}>
          <Col>
            <p>
              Hope you enjoy your stay!
            </p>
            <div>
              <Button href="/integration-hub" style={{ backgroundColor: "#98611F", borderColor: "#98611F" }}>
                Spotify Crate Digger
              </Button>
            </div>
          </Col>
        </Row>
        {/* <DashedTriangle /> */}
      </Container>
    </div>
  );
}
