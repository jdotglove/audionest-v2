import React, { Fragment, useContext } from "react";
import NextImage from "next/image";
import { Button, Image, ListGroup, Row, Col, Card } from "react-bootstrap";

import CurrentTrackBreakdown from "../Containers/CurrentTrackBreakdown";
import { parseUriForId } from "../../utils/spotify";
import placeholderImg from "../../../public/placeholder.png";
import RecommendationContext from "../../contexts/RecommendationContext";
import PlaylistContext from "../../contexts/PlaylistContext";
import ChartContext from "../../contexts/ChartContext";

export default function RecommendationDisplay({ user }) {
  const userSpotifyId = parseUriForId(user.uri);
  const { chartData } = useContext(ChartContext);
  return (
    <Fragment>
      <RecommendationContext.Consumer>
        {({
          addToQueue,
          atLeastOneSeedSelected,
          clearSelectedSeeds,
          generateRecommendations,
          recommendedTrackList,
          retrieveCurrentTrackBreakdown,
          currentTrackBreakdown,
          seedCurrentVibes,
        }) => (
          <Fragment>
            <Row className="mx-2 pb-2">
              <Col>
                <Button
                  className="mt-1"
                  onClick={generateRecommendations}
                  disabled={!atLeastOneSeedSelected()}
                  variant={"light"}
                >
                  Generate Recommendations
                </Button>
              </Col>
              <Col>
                <Button
                  className="mt-1"
                  onClick={() => retrieveCurrentTrackBreakdown(userSpotifyId)}
                  variant={"light"}
                >
                  Retrieve Current Vibes
                </Button>{" "}
                {currentTrackBreakdown && currentTrackBreakdown.item ? (
                  <Button
                    className="mt-1"
                    onClick={async () => {
                      await clearSelectedSeeds();
                      await seedCurrentVibes(currentTrackBreakdown.item, chartData);
                      await generateRecommendations();
                    }}
                    variant={"light"}
                  >
                    Generate Similar Vibes
                  </Button>
                ) : (
                  <Fragment></Fragment>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{ height: "32rem" }}
                  className="mx-2 overflow-scroll"
                >
                  <ListGroup variant="flush">
                    {recommendedTrackList.map((track) => (
                      <ListGroup.Item
                        className="d-flex justify-content-between align-items-center"
                        key={track.id}
                      >
                        {track.album.images[0] ? (
                          <Image
                            src={track.album.images[0]?.url}
                            height={55}
                            width={55}
                            roundedCircle
                            alt="Track Picture"
                          />
                        ) : (
                          <NextImage
                            src={placeholderImg}
                            height={55}
                            width={55}
                            alt="Default Track Picture"
                          />
                        )}
                        <span className="px-2">
                          {track.name} - {track.artists[0].name}
                        </span>
                        <PlaylistContext.Consumer>
                          {({ addToPlaylistBuilder }) => (
                            <Fragment>
                              <Button
                                variant="link"
                                onClick={() => addToPlaylistBuilder(track)}
                              >
                                Add To Playlist
                              </Button>
                              <Button
                                variant="link"
                                onClick={() => addToQueue(userSpotifyId, track)}
                              >
                                Add To Queue
                              </Button>
                            </Fragment>
                          )}
                        </PlaylistContext.Consumer>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
              <Col>
                <CurrentTrackBreakdown />
              </Col>
            </Row>
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
