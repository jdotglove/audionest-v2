import React, { Fragment, useRef, useContext } from "react";
import { Alert, Button, Card, Container, Row, Col } from "react-bootstrap";

import RecommendationSeedSearch from "./SeedSearch";
import RecommendationSelection from "./Selection";
import RecommendationDisplay from "./Display";
import RecommendationProvider from "../../providers/RecommendationProvider";
import RecommendationContext from "../../contexts/RecommendationContext";
import PlaylistProvider from "../../providers/PlaylistProvider";
import ChartProvider from "../../providers/ChartProvider";
import PlaylistContext from "../../contexts/PlaylistContext";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function RecommendationGeneratorContainer() {
  return (
    <Fragment>
      <SpotifyContext.Consumer>
        {({ isLoggedIn, user }) =>
          !isLoggedIn ? (
            <Container>
              <Row>
                <Col className="pt-3"></Col>
              </Row>
            </Container>
          ) : (
            <PlaylistProvider>
              <RecommendationProvider>
                <Row>
                  <RecommendationContext.Consumer>
                    {({
                      dismissAddToQueueAlert,
                      selectedSeedArtists,
                      selectedSeedTracks,
                      clearSelectedSeeds,
                      showQueueAlert,
                      queueAddResult,
                      targetAudioFeaturesMap,
                      toggleShowSeedSearch,
                    }) => (
                      <Card
                        className="my-2"
                        text="dark"
                        bg="light"
                        key="seed-alert"
                      >
                        <Card.Header>
                          <h5>Selected Seeds (Max 5 in total)</h5>
                        </Card.Header>
                        <Card.Body>
                          <div>
                            Tracks:{" "}
                            {selectedSeedTracks.map((trackObj, idx) => (
                              <Fragment key={trackObj.id}>
                                {trackObj.name}
                                {selectedSeedTracks[idx + 1] ? (
                                  <Fragment>, </Fragment>
                                ) : (
                                  <Fragment></Fragment>
                                )}
                              </Fragment>
                            ))}
                          </div>
                          <div>
                            Artists:{" "}
                            {selectedSeedArtists.map((artistObj, idx) => (
                              <Fragment key={artistObj.id}>
                                {artistObj.name}
                                {selectedSeedArtists[idx + 1] ? (
                                  <Fragment>, </Fragment>
                                ) : (
                                  <Fragment></Fragment>
                                )}
                              </Fragment>
                            ))}
                          </div>
                          <div>
                            Target Audio Features:{" "}
                            {targetAudioFeaturesMap ? (
                              Object.keys(targetAudioFeaturesMap).map(
                                (audioFeatureLabel, idx) => (
                                  <Fragment key={audioFeatureLabel}>
                                    {audioFeatureLabel}:{" "}
                                    {Number.parseFloat(
                                      targetAudioFeaturesMap[audioFeatureLabel]
                                    ).toFixed(2)}
                                    {Object.keys(targetAudioFeaturesMap)[
                                      idx + 1
                                    ] ? (
                                      <Fragment>, </Fragment>
                                    ) : (
                                      <Fragment></Fragment>
                                    )}
                                  </Fragment>
                                )
                              )
                            ) : (
                              <Fragment></Fragment>
                            )}
                          </div>
                        </Card.Body>
                        <Card.Footer>
                          <Row>
                            <Col md={4}>
                              <Button
                                variant="primary"
                                onClick={() => toggleShowSeedSearch(true)}
                              >
                                Add Seeds
                              </Button>{" "}
                              <Button
                                variant="danger"
                                onClick={clearSelectedSeeds}
                              >
                                Clear Seeds
                              </Button>
                            </Col>
                            <PlaylistContext.Consumer>
                              {({ toggleShowPlaylistBuilder }) => (
                                <Col md={{ span: 2, offset: 6 }}>
                                  <Button
                                    variant="dark"
                                    onClick={() =>
                                      toggleShowPlaylistBuilder(true)
                                    }
                                  >
                                    View Playlist
                                  </Button>
                                </Col>
                              )}
                            </PlaylistContext.Consumer>
                          </Row>
                        </Card.Footer>
                        <Alert
                          show={showQueueAlert}
                          variant={queueAddResult}
                          onClose={() => dismissAddToQueueAlert()}
                          dismissible
                        >
                          {queueAddResult === "success" ? (
                            <div>Added To Queue!</div>
                          ) : (
                            <div>Error Adding To Queue</div>
                          )}
                        </Alert>
                      </Card>
                    )}
                  </RecommendationContext.Consumer>
                </Row>
                <RecommendationSeedSearch />
                <Row>
                  <Col>
                    <RecommendationDisplay user={user} />
                  </Col>
                </Row>
                <RecommendationSelection user={user} />
              </RecommendationProvider>
            </PlaylistProvider>
          )
        }
      </SpotifyContext.Consumer>
    </Fragment>
  );
}
