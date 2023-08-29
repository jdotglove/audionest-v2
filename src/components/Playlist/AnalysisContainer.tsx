import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import PlaylistDisplay from "./Display";
import PlaylistDetails from "./Details";
import TrackStatistics from "../Track/Statistics";

export default function PlaylistAnalysisContainer() {
  return (
    <Container>
      <Row>
        <Col>
          <PlaylistDisplay />
        </Col>
        <Col>
          <PlaylistDetails />
        </Col>
        <Col>
          <TrackStatistics />
        </Col>
      </Row>
    </Container>
  );
}
