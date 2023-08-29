import React, { Fragment } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

import ArtistProvider from "../../providers/ArtistProvider";
import ArtistContext from "../../contexts/ArtistContext";
import TrackProvider from "../../providers/TrackProvider";
import TrackContext from "../../contexts/TrackContext";
import SpotifyContext from "../../contexts/SpotifyContext";
import styles from "../../../styles/StatisticsSection.module.css";

export default function UserProfileContainer() {
  return (
    <SpotifyContext.Consumer>
      {({ topTracks, topArtists }) => (
        <Container>
          <Row>
            <Col>
              {topTracks && (
                <div>
                  <h3>Here are your current top tracks</h3>
                  <Card
                    className="overflow-scroll top-tracks-card"
                    bg="light"
                    style={{ height: "24rem", width: "32rem" }}
                  >
                    <Card.Header
                      className={styles["playlist-track-container-header"]}
                    >
                      {topTracks.map((trackId, index) => (
                        <TrackProvider
                          key={`track-${trackId}`}
                          trackId={trackId}
                        >
                          <TrackContext.Consumer>
                            {({ name, artists }) => (
                              <div>
                                {index + 1}. {name} -{" "}
                                {artists.map((artist, idx) => (
                                  <ArtistProvider
                                    key={`track-artist-${artist.id}`}
                                    artistId={artist.id}
                                  >
                                    <ArtistContext.Consumer>
                                      {({ name: artistName }) => (
                                        <Fragment>
                                          {artistName}
                                          {artists.length - 1 > idx ? (
                                            <Fragment>, </Fragment>
                                          ) : (
                                            <Fragment> </Fragment>
                                          )}{" "}
                                        </Fragment>
                                      )}
                                    </ArtistContext.Consumer>
                                  </ArtistProvider>
                                ))}
                              </div>
                            )}
                          </TrackContext.Consumer>
                        </TrackProvider>
                      ))}
                    </Card.Header>
                  </Card>
                </div>
              )}
            </Col>
            <Col>
              {topArtists.length > 0 && (
                <div>
                  <h3>Here are your current top artists</h3>
                  <Card
                    className="overflow-scroll top-artists-card"
                    bg="light"
                    style={{ height: "24rem", width: "32rem" }}
                  >
                    <Card.Header
                      className={styles["playlist-track-container-header"]}
                    >
                      {topArtists.map((artistId, index) => (
                        <ArtistProvider
                          key={`artist-${artistId}`}
                          artistId={artistId}
                        >
                          <ArtistContext.Consumer>
                            {({ name, popularity }) => (
                              <div>
                                {index + 1}. {name} - Popularity: {popularity}
                              </div>
                            )}
                          </ArtistContext.Consumer>
                        </ArtistProvider>
                      ))}
                    </Card.Header>
                  </Card>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
