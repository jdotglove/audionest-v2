import React from "react";
import { Container, Card, Col, ListGroup, Row, Button } from "react-bootstrap";
import SpotifyContext from "../../contexts/SpotifyContext";
import styles from "../../../styles/StatisticsSection.module.css";
import TrackSelector from "../Buttons/TrackSelector";
import ChartContext from "../../contexts/ChartContext";
import ChartProvider from "../../providers/ChartProvider";

export default function PlaylistDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ currentSelectedPlaylist }) => (
        <Container>
          {currentSelectedPlaylist &&
            currentSelectedPlaylist.tracks &&
            currentSelectedPlaylist.tracks.length && (
              <Row>
                <Col>
                  <h3>Selected Playlist Details:</h3>
                  <Card bg="light" style={{ width: "18rem", height: "48rem" }}>
                    <Card.Header
                      className={styles["playlist-track-container-header"]}
                    >
                      <h5> {currentSelectedPlaylist.name} </h5>
                      <ChartContext.Consumer>
                        {({ setChartData }) => (
                          <Button
                            onClick={async () => {
                              const trackIdArray =
                                currentSelectedPlaylist.tracks.map(
                                  ({ id }) => id
                                );
                              // setSelectedTracks(trackIdArray);
                              await setChartData(trackIdArray);
                            }}
                          >
                            Show Full Playlist Breakdown
                          </Button>
                        )}
                      </ChartContext.Consumer>
                    </Card.Header>
                    <Card.Body className="overflow-scroll">
                      <ListGroup>
                        {currentSelectedPlaylist.tracks.map((track) => (
                          <TrackSelector
                            key={track.id}
                            track={track}
                            // setSelectedTracks={setSelectedTracks}
                          />
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
