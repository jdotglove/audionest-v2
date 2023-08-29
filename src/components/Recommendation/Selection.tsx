import { Fragment, useState, useRef, useContext } from "react";
import {
  Button,
  Offcanvas,
  ListGroup,
  Image,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import NextImage from "next/image";

import { parseUriForId } from "../../utils/spotify";
import placeholderImg from "../../../public/placeholder.png";
import PlaylistContext from "../../contexts/PlaylistContext";

export default function RecommendationSelection({ user }) {
  const userSpotifyId = parseUriForId(user.uri);
  const playlistTitleInput = useRef(null);
  const playlistDescriptionInput = useRef(null);
  const [modelOpen, setModalOpen] = useState(false);
  const { savePlaylist, toggleShowPlaylistBuilder, clearPlaylistBuilder } = useContext(PlaylistContext);
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleSave = () => {
    const title = playlistTitleInput.current.value;
    const description = playlistDescriptionInput.current.value;
    savePlaylist(userSpotifyId, title, description)
    handleCloseModal();
    toggleShowPlaylistBuilder(false);
    clearPlaylistBuilder();
  };

  return (
    <Fragment>
      <PlaylistContext.Consumer>
        {({
          toggleShowPlaylistBuilder,
          showPlaylistBuilder,
          selectedTracks,
        }) => (
          <Fragment>
            <Modal show={modelOpen} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Set Playlist Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="py-2">
                  <Col>
                    Playlist Title:{" "}
                    <input
                      type="text"
                      ref={playlistTitleInput}
                      aria-label="Playlist Title"
                      aria-describedby="playlist-title"
                    />
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col>
                    Playlist Description:{" "}
                    <textarea
                      maxLength={150}
                      ref={playlistDescriptionInput}
                      aria-label="Playlist Title"
                      aria-describedby="playlist-title"
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <Offcanvas
              placement="end"
              show={showPlaylistBuilder}
              onHide={() => toggleShowPlaylistBuilder(false)}
            >
              <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title>Playlist Builder</Offcanvas.Title>
                {selectedTracks.length > 0 ? (
                  <Button onClick={handleOpenModal} variant="success">
                    Save Playlist
                  </Button>
                ) : (
                  <Fragment></Fragment>
                )}
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ListGroup variant="flush">
                  {selectedTracks.map((track) => (
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
                      <span className="px-2">{track.name}</span>
                      <PlaylistContext.Consumer>
                        {({ removeFromPlaylistBuilder }) => (
                          <Button
                            variant="link"
                            onClick={() => removeFromPlaylistBuilder(track)}
                          >
                            Remove From Playlist
                          </Button>
                        )}
                      </PlaylistContext.Consumer>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Offcanvas.Body>
            </Offcanvas>
          </Fragment>
        )}
      </PlaylistContext.Consumer>
    </Fragment>
  );
}
