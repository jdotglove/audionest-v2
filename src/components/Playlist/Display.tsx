import React, { Fragment } from "react";

import SpotifyContext from "../../contexts/SpotifyContext";
import PlaylistSelector from "../Buttons/PlaylistSelector";
import { Container, Card, ListGroup } from "react-bootstrap";
import PlaylistProvider from "../../providers/PlaylistProvider";

export default function PlaylistDisplay() {
  return (
    <SpotifyContext.Consumer>
      {({ playlists, setSelectedPlaylist }) => (
        <Container>
          {playlists.length && (
            <Card className="d-grid m-3 gap-2" style={{ height: "50rem", maxWidth: "300px" }}>
                <h3>User Playlists</h3>
              <Card.Body className="overflow-scroll">
                <ListGroup>
                  {playlists.map(
                    (playlist: Audionest.Playlist, idx: number) => {
                      return (
                        <Fragment key={idx}>
                          <PlaylistSelector
                            playlist={playlist}
                            setSelectedPlaylist={setSelectedPlaylist}
                          />
                        </Fragment>
                      );
                    }
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
