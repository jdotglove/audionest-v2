import { Fragment, useContext, useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

import DiscoveryContext from "../../contexts/DiscoveryContext";
import ChartContext from "../../contexts/ChartContext";
import TrackStatistics from "../Track/Statistics";

export default function MoreCategoryItemInfo({
  showMoreInfo,
  setShowMoreInfo,
  categoryItem,
}) {
  const { setChartData } = useContext(ChartContext);
  useEffect(() => {
    if (categoryItem.type !== 'playlist') {
      const filteredTracks = categoryItem.tracks.items.filter(track => track);
      setChartData(filteredTracks.map((track) => track.id));
    }
  },[categoryItem]);

  const handleCloseInfoModal = () => {
    setShowMoreInfo(false);
  };
  const handleShowInfoModal = () => setShowMoreInfo(true);
  const formatFollowers = (numOfFollowers: number) => (numOfFollowers.toLocaleString("en-US"));
  return (
    <Fragment>
      <Modal
        size="lg"
        show={showMoreInfo}
        onHide={handleCloseInfoModal}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {categoryItem.name} -{" "}
            {categoryItem.artists ? (
              <Fragment>{categoryItem.artists[0].name}</Fragment>
            ) : (
              <Fragment>{categoryItem.owner.display_name}</Fragment>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="pb-3">
            <Col>
              <img
                src={categoryItem.images[0]?.url}
                alt={`${categoryItem.name}-image`}
                width={300}
                height={300}
              />
            </Col>
            {categoryItem.type !== "playlist" ? (
              <Col>
                <TrackStatistics />
              </Col>
            ) : (
              <Fragment></Fragment>
            )}
          </Row>
          <Row className="pb-3">
            <Col>
              <a href={categoryItem.external_urls.spotify} target="_blank">
                Open In Spotify
              </a>
            </Col>
          </Row>
          {categoryItem.type === "playlist" ? (
            <Fragment>
              <Row>
                <Col>
                  <h5>Description:</h5> {categoryItem.description}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Followers:</h5>{" "}
                  {formatFollowers(categoryItem.followers.total)}
                </Col>
              </Row>
            </Fragment>
          ) : (
            <Fragment>
              <Row className="pb-3">
                <Col>
                  {categoryItem.genres ? (
                    <Fragment>
                      <h5>Genres:</h5>{" "}
                      {categoryItem.genres.length === 0 ? (
                        <Fragment>Not Yet Classified</Fragment>
                      ) : (
                        <Fragment>
                          {categoryItem.genres.map((genre: string) => (
                            <div key={`${categoryItem.id}-${genre}`}>
                              {genre}
                            </div>
                          ))}{" "}
                        </Fragment>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </Col>
              </Row>
              <Row className="pb-3">
                <Col>
                  {categoryItem.artists ? (
                    <Fragment>
                      <h5>Artists:</h5>{" "}
                      {categoryItem.artists.map((artist: any) => (
                        <div key={`${categoryItem.id}-${artist.id}`}>
                          {artist.name}
                        </div>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </Col>
              </Row>
              <Row className="pb-3">
                <Col>
                  <h5>Release Data:</h5> {categoryItem.release_date}
                </Col>
              </Row>
              <Row className="pb-3">
                <Col>
                  <h5># of Tracks:</h5> {categoryItem.tracks.items.length}
                </Col>
              </Row>
            </Fragment>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
