import React from "react";
import { Button } from "react-bootstrap";

import PlaylistContext from "../../contexts/PlaylistContext";
import PlaylistProvider from "../../providers/PlaylistProvider";

export default function PlaylistSelector({
  setSelectedPlaylist,
  playlist,
}: {
  setSelectedPlaylist: Function;
  playlist: Audionest.Playlist;
}) {
  return (
    <PlaylistProvider>
      <PlaylistContext.Consumer>
        {({ getPlaylistTracks }) => (
          <Button
            variant="outline-info"
            style={{
              justifyContent: "space-between",
              textTransform: "none",
              borderRadius: "25px",
            }}
            onClick={async () => {
              await setSelectedPlaylist({
                uri: playlist.uri,
                name: playlist.name,
                tracks: await getPlaylistTracks(playlist.id),
              });
            }}
          >
            {playlist ? playlist.name : ""}
          </Button>
        )}
      </PlaylistContext.Consumer>
    </PlaylistProvider>
  );
}
